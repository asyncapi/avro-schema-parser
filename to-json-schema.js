const BYTES_PATTERN = '^[\u0000-\u00ff]*$';
const INT_MIN = Math.pow(-2, 31);
const INT_MAX = Math.pow(2, 31) - 1;
const LONG_MIN = Math.pow(-2, 63);
const LONG_MAX = Math.pow(2, 63) - 1;

const typeMappings = {
  null: 'null',
  boolean: 'boolean',
  int: 'integer',
  long: 'integer',
  float: 'number',
  double: 'number',
  bytes: 'string',
  string: 'string',
  fixed: 'string',
  map: 'object',
  array: 'array',
  enum: 'string',
  record: 'object',
  uuid: 'string',
};

module.exports.avroToJsonSchema = async function avroToJsonSchema(avroDefinition) {
  const jsonSchema = {};
  const isUnion = Array.isArray(avroDefinition);

  if (isUnion) {
    jsonSchema.oneOf = [];
    for (const avroDef of avroDefinition) {
      const def = await avroToJsonSchema(avroDef);
      jsonSchema.oneOf.push(def);
    }

    return jsonSchema;
  }
  
  // Avro definition can be a string (e.g. "int")
  // or an object like { type: "int" }
  const type = avroDefinition.type || avroDefinition;
  jsonSchema.type = typeMappings[type];
  
  switch (type) {
  case 'int':
    jsonSchema.minimum = INT_MIN;
    jsonSchema.maximum = INT_MAX;
    break;
  case 'long':
    jsonSchema.minimum = LONG_MIN;
    jsonSchema.maximum = LONG_MAX;
    break;
  case 'bytes':
    jsonSchema.pattern = BYTES_PATTERN;
    break;
  case 'fixed':
    jsonSchema.pattern = BYTES_PATTERN;
    jsonSchema.minLength = avroDefinition.size;
    jsonSchema.maxLength = avroDefinition.size;
    break;
  case 'map':
    jsonSchema.additionalProperties = await avroToJsonSchema(avroDefinition.values);
    break;
  case 'array':
    jsonSchema.items = await avroToJsonSchema(avroDefinition.items);
    break;
  case 'enum':
    jsonSchema.enum = avroDefinition.symbols;
    break;
  case 'record':
    const propsMap = new Map();
    for (const field of avroDefinition.fields) {
      const def = await avroToJsonSchema(field.type);
      if (field.doc) def.description = field.doc;
      if (field.default) def.default = field.default;
      propsMap.set(field.name, def);
    }
    jsonSchema.properties = Object.fromEntries(propsMap.entries());
    break;
  }

  if (avroDefinition.doc) jsonSchema.description = avroDefinition.doc;
  if (avroDefinition.default !== undefined) jsonSchema.default = avroDefinition.default;

  return jsonSchema;
};
