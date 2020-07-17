const fs = require('fs');
const path = require('path');
const avroSchemaParser = require('..');
const parser = require('@asyncapi/parser');

const inputWithAvro = fs.readFileSync(path.resolve(__dirname, './asyncapi-avro.yaml'), 'utf8');
const outputWithAvro = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-2>"},"age":{"oneOf":[{"type":"null","x-parser-schema-id":"<anonymous-schema-4>"},{"type":"integer","minimum":-2147483648,"maximum":2147483647,"x-parser-schema-id":"<anonymous-schema-5>"}],"x-parser-schema-id":"<anonymous-schema-3>"},"gender":{"type":"string","enum":["FEMALE","MALE"],"x-parser-schema-id":"<anonymous-schema-6>"},"address":{"type":"object","properties":{"zipcode":{"type":"integer","minimum":-2147483648,"maximum":2147483647,"x-parser-schema-id":"<anonymous-schema-8>"}},"x-parser-schema-id":"<anonymous-schema-7>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/vnd.apache.avro;version=1.9.0","x-parser-original-payload":{"name":"Person","type":"record","fields":[{"name":"name","type":"string"},{"name":"age","type":["null","int"],"default":null},{"name":"gender","type":{"name":"Gender","type":"enum","symbols":["FEMALE","MALE"]}},{"name":"address","type":{"name":"Address","type":"record","fields":[{"name":"zipcode","type":"int"}]}}]},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"<anonymous-message-1>"}}}}}';

parser.registerSchemaParser(avroSchemaParser);

describe('parse()', function() {
  it('should parse Avro schemas', async function() {
    const result = await parser.parse(inputWithAvro, { path: __filename });
    expect(JSON.stringify(result.json())).toEqual(outputWithAvro);
  });
});
