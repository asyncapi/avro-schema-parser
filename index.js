const { avroToJsonSchema } = require('./to-json-schema.js');

module.exports.parse = async ({ message, defaultSchemaFormat }) => {
  const transformed = await avroToJsonSchema(message.payload);

  message['x-parser-original-schema-format'] = message.schemaFormat || defaultSchemaFormat;
  message['x-parser-original-payload'] = message.payload;
  message.payload = transformed;
  delete message.schemaFormat;
};

module.exports.getMimeTypes = () => {
  return [
    'application/vnd.apache.avro;version=1.9.0',
    'application/vnd.apache.avro+json;version=1.9.0',
    'application/vnd.apache.avro+yaml;version=1.9.0',
    'application/vnd.apache.avro;version=1.8.2',
    'application/vnd.apache.avro+json;version=1.8.2',
    'application/vnd.apache.avro+yaml;version=1.8.2'
  ];
};
