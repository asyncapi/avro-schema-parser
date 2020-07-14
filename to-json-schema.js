const BYTES_PATTERN = '^[\u0000-\u00ff]*$';
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
};

module.exports.avroToJsonSchema = async function avroToJsonSchema(avroDefinition) {
  const jsonSchema = {};
  const type = avroDefinition.type || avroDefinition;

  jsonSchema.type = Array.isArray(type)
    ? type.map(t => typeMappings[t] || 'object')
    : typeMappings[type];

  switch (type) {
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
