const fs = require('fs');
const path = require('path');
const avroSchemaParser = require('..');
const parser = require('@asyncapi/parser');

const inputWithAvro190 = fs.readFileSync(path.resolve(__dirname, './asyncapi-avro-1.9.0.yaml'), 'utf8');
const outputWithAvro190 = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-2>"},"age":{"oneOf":[{"type":"null","x-parser-schema-id":"<anonymous-schema-4>"},{"type":"integer","minimum":-2147483648,"maximum":2147483647,"x-parser-schema-id":"<anonymous-schema-5>"}],"x-parser-schema-id":"<anonymous-schema-3>"},"favoriteProgrammingLanguage":{"type":"string","enum":["JS","Java","Go","Rust","C"],"default":"JS","x-parser-schema-id":"<anonymous-schema-6>"},"address":{"type":"object","properties":{"zipcode":{"type":"integer","minimum":-2147483648,"maximum":2147483647,"x-parser-schema-id":"<anonymous-schema-8>"}},"x-parser-schema-id":"<anonymous-schema-7>"},"someid":{"type":"string","x-parser-schema-id":"<anonymous-schema-9>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/vnd.apache.avro;version=1.9.0","x-parser-original-payload":{"name":"Person","type":"record","fields":[{"name":"name","type":"string"},{"name":"age","type":["null","int"],"default":null},{"name":"favoriteProgrammingLanguage","type":{"name":"ProgrammingLanguage","type":"enum","symbols":["JS","Java","Go","Rust","C"],"default":"JS"}},{"name":"address","type":{"name":"Address","type":"record","fields":[{"name":"zipcode","type":"int"}]}},{"name":"someid","type":"uuid"}]},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"<anonymous-message-1>"}}}}}';

const inputWithAvro182 = fs.readFileSync(path.resolve(__dirname, './asyncapi-avro-1.8.2.yaml'), 'utf8');
const outputWithAvro182 = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":"object","properties":{"name":{"type":"string","x-parser-schema-id":"<anonymous-schema-2>"},"age":{"oneOf":[{"type":"null","x-parser-schema-id":"<anonymous-schema-4>"},{"type":"integer","minimum":-2147483648,"maximum":2147483647,"x-parser-schema-id":"<anonymous-schema-5>"}],"x-parser-schema-id":"<anonymous-schema-3>"},"favoriteProgrammingLanguage":{"type":"string","enum":["JS","Java","Go","Rust","C"],"x-parser-schema-id":"<anonymous-schema-6>"},"address":{"type":"object","properties":{"zipcode":{"type":"integer","minimum":-2147483648,"maximum":2147483647,"x-parser-schema-id":"<anonymous-schema-8>"}},"x-parser-schema-id":"<anonymous-schema-7>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/vnd.apache.avro;version=1.8.2","x-parser-original-payload":{"name":"Person","type":"record","fields":[{"name":"name","type":"string"},{"name":"age","type":["null","int"],"default":null},{"name":"favoriteProgrammingLanguage","type":{"name":"ProgrammingLanguage","type":"enum","symbols":["JS","Java","Go","Rust","C"]}},{"name":"address","type":{"name":"Address","type":"record","fields":[{"name":"zipcode","type":"int"}]}}]},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-name":"<anonymous-message-1>"}}}}}';

parser.registerSchemaParser(avroSchemaParser);

describe('parse()', function() {
  it('should parse Avro schema 1.9.0', async function() {
    const result = await parser.parse(inputWithAvro190, { path: __filename });
    expect(JSON.stringify(result.json())).toEqual(outputWithAvro190);
  });
  it('should parse Avro schema 1.8.2', async function() {
    const result = await parser.parse(inputWithAvro182, { path: __filename });
    expect(JSON.stringify(result.json())).toEqual(outputWithAvro182);
  });
});
