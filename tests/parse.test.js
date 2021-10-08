const fs = require('fs');
const path = require('path');
const avroSchemaParser = require('..');
const parser = require('@asyncapi/parser');

const inputWithAvro182 = fs.readFileSync(path.resolve(__dirname, './asyncapi-avro-1.8.2.yaml'), 'utf8');
const outputWithAvro182 = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":"object","required":["name","favoriteProgrammingLanguage","address"],"properties":{"name":{"type":"string","examples":["Donkey"],"x-parser-schema-id":"<anonymous-schema-2>"},"age":{"oneOf":[{"type":"integer","minimum":-2147483648,"maximum":2147483647,"x-parser-schema-id":"<anonymous-schema-4>"},{"type":"null","x-parser-schema-id":"<anonymous-schema-5>"}],"default":null,"x-parser-schema-id":"<anonymous-schema-3>"},"favoriteProgrammingLanguage":{"type":"string","enum":["JS","Java","Go","Rust","C"],"x-parser-schema-id":"<anonymous-schema-6>"},"address":{"type":"object","required":["zipcode"],"properties":{"zipcode":{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[53003],"x-parser-schema-id":"<anonymous-schema-8>"}},"x-parser-schema-id":"<anonymous-schema-7>"}},"x-parser-schema-id":"<anonymous-schema-1>"},"x-parser-original-schema-format":"application/vnd.apache.avro;version=1.8.2","x-parser-original-payload":{"type":"record","fields":[{"name":"name","type":"string","example":"Donkey"},{"name":"age","type":["null","int"],"default":null},{"name":"favoriteProgrammingLanguage","type":{"name":"ProgrammingLanguage","type":"enum","symbols":["JS","Java","Go","Rust","C"]}},{"name":"address","type":{"name":"Address","type":"record","fields":[{"name":"zipcode","type":"int","example":"53003"}]}}]},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"<anonymous-message-1>"}}}},"x-parser-spec-parsed":true}';

const inputWithAvro190 = fs.readFileSync(path.resolve(__dirname, './asyncapi-avro-1.9.0.yaml'), 'utf8');
const outputWithAvro190 = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":"object","required":["name","favoriteProgrammingLanguage","address","someid"],"properties":{"name":{"type":"string","examples":["Donkey"],"x-parser-schema-id":"<anonymous-schema-1>"},"age":{"oneOf":[{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[123],"x-parser-schema-id":"<anonymous-schema-3>"},{"type":"null","x-parser-schema-id":"<anonymous-schema-4>"}],"default":null,"x-parser-schema-id":"<anonymous-schema-2>"},"favoriteProgrammingLanguage":{"type":"string","enum":["JS","Java","Go","Rust","C"],"default":"JS","x-parser-schema-id":"<anonymous-schema-5>"},"address":{"type":"object","required":["zipcode"],"properties":{"zipcode":{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[53003],"x-parser-schema-id":"<anonymous-schema-7>"}},"x-parser-schema-id":"<anonymous-schema-6>"},"someid":{"type":"string","x-parser-schema-id":"<anonymous-schema-8>"}},"x-parser-schema-id":"Person"},"x-parser-original-schema-format":"application/vnd.apache.avro;version=1.9.0","x-parser-original-payload":{"name":"Person","type":"record","fields":[{"name":"name","type":"string","example":"Donkey"},{"name":"age","type":["null","int"],"default":null,"example":"123"},{"name":"favoriteProgrammingLanguage","type":{"name":"ProgrammingLanguage","type":"enum","symbols":["JS","Java","Go","Rust","C"],"default":"JS"}},{"name":"address","type":{"name":"Address","type":"record","fields":[{"name":"zipcode","type":"int","example":"53003"}]}},{"name":"someid","type":"uuid"}]},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"<anonymous-message-1>"}}}},"x-parser-spec-parsed":true}';

const inputWithAvro190WithNamespace = fs.readFileSync(path.resolve(__dirname, './asyncapi-avro-1.9.0-namespace.yaml'), 'utf8');
const outputWithAvro190WithNamespace = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":"object","required":["name","favoriteProgrammingLanguage","address","someid"],"properties":{"name":{"type":"string","examples":["Donkey"],"x-parser-schema-id":"<anonymous-schema-1>"},"age":{"oneOf":[{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[123],"x-parser-schema-id":"<anonymous-schema-3>"},{"type":"null","x-parser-schema-id":"<anonymous-schema-4>"}],"default":null,"x-parser-schema-id":"<anonymous-schema-2>"},"favoriteProgrammingLanguage":{"type":"string","enum":["JS","Java","Go","Rust","C"],"default":"JS","x-parser-schema-id":"<anonymous-schema-5>"},"address":{"type":"object","required":["zipcode"],"properties":{"zipcode":{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[53003],"x-parser-schema-id":"<anonymous-schema-7>"}},"x-parser-schema-id":"<anonymous-schema-6>"},"someid":{"type":"string","x-parser-schema-id":"<anonymous-schema-8>"}},"x-parser-schema-id":"com.company.Person"},"x-parser-original-schema-format":"application/vnd.apache.avro;version=1.9.0","x-parser-original-payload":{"name":"Person","namespace":"com.company","type":"record","fields":[{"name":"name","type":"string","example":"Donkey"},{"name":"age","type":["null","int"],"default":null,"example":"123"},{"name":"favoriteProgrammingLanguage","type":{"name":"ProgrammingLanguage","type":"enum","symbols":["JS","Java","Go","Rust","C"],"default":"JS"}},{"name":"address","type":{"name":"Address","type":"record","fields":[{"name":"zipcode","type":"int","example":"53003"}]}},{"name":"someid","type":"uuid"}]},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"<anonymous-message-1>"}}}},"x-parser-spec-parsed":true}';

const inputWithAvro190WithBindings = fs.readFileSync(path.resolve(__dirname, './asyncapi-avro-1.9.0-bindings.yaml'), 'utf8');
const outputWithAvro190WithBindings = '{"asyncapi":"2.0.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":"object","required":["name","favoriteProgrammingLanguage","address","someid"],"properties":{"name":{"type":"string","examples":["Donkey"],"x-parser-schema-id":"<anonymous-schema-1>"},"age":{"oneOf":[{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[123],"x-parser-schema-id":"<anonymous-schema-3>"},{"type":"null","x-parser-schema-id":"<anonymous-schema-4>"}],"default":null,"x-parser-schema-id":"<anonymous-schema-2>"},"favoriteProgrammingLanguage":{"type":"string","enum":["JS","Java","Go","Rust","C"],"default":"JS","x-parser-schema-id":"<anonymous-schema-5>"},"address":{"type":"object","required":["zipcode"],"properties":{"zipcode":{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[53003],"x-parser-schema-id":"<anonymous-schema-7>"}},"x-parser-schema-id":"<anonymous-schema-6>"},"someid":{"type":"string","x-parser-schema-id":"<anonymous-schema-8>"}},"x-parser-schema-id":"com.company.Person"},"bindings":{"kafka":{"key":{"type":"object","required":["name","favoriteProgrammingLanguage","address","someid"],"properties":{"name":{"type":"string","examples":["Donkey"]},"age":{"oneOf":[{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[123]},{"type":"null"}],"default":null},"favoriteProgrammingLanguage":{"type":"string","enum":["JS","Java","Go","Rust","C"],"default":"JS"},"address":{"type":"object","required":["zipcode"],"properties":{"zipcode":{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[53003]}}},"someid":{"type":"string"}},"x-parser-schema-id":"com.company.Person"}},"mqtt":{"x-test":{"type":"string"}}},"x-parser-original-schema-format":"application/vnd.apache.avro;version=1.9.0","x-parser-original-payload":{"name":"Person","namespace":"com.company","type":"record","fields":[{"name":"name","type":"string","example":"Donkey"},{"name":"age","type":["null","int"],"default":null,"example":"123"},{"name":"favoriteProgrammingLanguage","type":{"name":"ProgrammingLanguage","type":"enum","symbols":["JS","Java","Go","Rust","C"],"default":"JS"}},{"name":"address","type":{"name":"Address","type":"record","fields":[{"name":"zipcode","type":"int","example":"53003"}]}},{"name":"someid","type":"uuid"}]},"x-parser-original-bindings-kafka-key":{"name":"Person","namespace":"com.company","type":"record","fields":[{"name":"name","type":"string","example":"Donkey"},{"name":"age","type":["null","int"],"default":null,"example":"123"},{"name":"favoriteProgrammingLanguage","type":{"name":"ProgrammingLanguage","type":"enum","symbols":["JS","Java","Go","Rust","C"],"default":"JS"}},{"name":"address","type":{"name":"Address","type":"record","fields":[{"name":"zipcode","type":"int","example":"53003"}]}},{"name":"someid","type":"uuid"}]},"schemaFormat":"application/vnd.aai.asyncapi;version=2.0.0","x-parser-message-parsed":true,"x-parser-message-name":"<anonymous-message-1>"}}}},"x-parser-spec-parsed":true}';

const inputWithAvroAdditionalAttributes = fs.readFileSync(path.resolve(__dirname, './asyncapi-avro-1.9.0-additional-attributes.yaml'), 'utf8');
const outputWithAvroAdditionalAttributes = '{"asyncapi":"2.1.0","info":{"title":"My API","version":"1.0.0"},"channels":{"mychannel":{"publish":{"message":{"payload":{"type":"object","required":["name","serialNo","favoriteProgrammingLanguage","certifications","address","weight","height","someid"],"properties":{"name":{"type":"string","examples":["Donkey"],"minLength":0,"x-parser-schema-id":"<anonymous-schema-1>"},"serialNo":{"type":"string","minLength":0,"maxLength":50,"x-parser-schema-id":"<anonymous-schema-2>"},"email":{"oneOf":[{"type":"string","examples":["donkey@asyncapi.com"],"pattern":"^[\\\\w-\\\\.]+@([\\\\w-]+\\\\.)+[\\\\w-]{2,4}$","x-parser-schema-id":"<anonymous-schema-4>"},{"type":"null","x-parser-schema-id":"<anonymous-schema-5>"}],"x-parser-schema-id":"<anonymous-schema-3>"},"age":{"oneOf":[{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[123],"exclusiveMinimum":0,"exclusiveMaximum":200,"x-parser-schema-id":"<anonymous-schema-7>"},{"type":"null","x-parser-schema-id":"<anonymous-schema-8>"}],"default":null,"x-parser-schema-id":"<anonymous-schema-6>"},"favoriteProgrammingLanguage":{"type":"string","enum":["JS","Java","Go","Rust","C"],"default":"JS","x-parser-schema-id":"<anonymous-schema-9>"},"certifications":{"type":"array","items":{"type":"string","x-parser-schema-id":"<anonymous-schema-11>"},"minItems":1,"maxItems":500,"uniqueItems":true,"x-parser-schema-id":"<anonymous-schema-10>"},"address":{"type":"object","required":["zipcode"],"properties":{"zipcode":{"type":"integer","minimum":-2147483648,"maximum":2147483647,"examples":[53003],"x-parser-schema-id":"<anonymous-schema-13>"},"country":{"oneOf":[{"type":"string","x-parser-schema-id":"<anonymous-schema-15>"},{"type":"null","x-parser-schema-id":"<anonymous-schema-16>"}],"x-parser-schema-id":"<anonymous-schema-14>"}},"x-parser-schema-id":"<anonymous-schema-12>"},"weight":{"type":"number","format":"float","examples":["65.0"],"minimum":0,"maximum":500,"x-parser-schema-id":"<anonymous-schema-17>"},"height":{"type":"number","format":"double","examples":["1.85"],"minimum":0,"maximum":3,"x-parser-schema-id":"<anonymous-schema-18>"},"someid":{"type":"string","format":"uuid","x-parser-schema-id":"<anonymous-schema-19>"}},"x-parser-schema-id":"com.company.Person"},"x-parser-original-schema-format":"application/vnd.apache.avro;version=1.9.0","x-parser-original-payload":{"name":"Person","namespace":"com.company","type":"record","fields":[{"name":"name","type":"string","example":"Donkey","minLength":0},{"name":"serialNo","type":"string","minLength":0,"maxLength":50},{"name":"email","type":["null","string"],"example":"donkey@asyncapi.com","pattern":"^[\\\\w-\\\\.]+@([\\\\w-]+\\\\.)+[\\\\w-]{2,4}$"},{"name":"age","type":["null","int"],"default":null,"example":"123","exclusiveMinimum":0,"exclusiveMaximum":200},{"name":"favoriteProgrammingLanguage","type":{"name":"ProgrammingLanguage","type":"enum","symbols":["JS","Java","Go","Rust","C"],"default":"JS"}},{"name":"certifications","type":{"type":"array","items":"string","minItems":1,"maxItems":500,"uniqueItems":true}},{"name":"address","type":{"name":"Address","type":"record","fields":[{"name":"zipcode","type":"int","example":53003},{"name":"country","type":["null","string"]}]}},{"name":"weight","type":"float","example":"65.0","minimum":0,"maximum":500},{"name":"height","type":"double","example":"1.85","minimum":0,"maximum":3},{"name":"someid","type":"string","logicalType":"uuid"}]},"schemaFormat":"application/vnd.aai.asyncapi;version=2.1.0","x-parser-message-parsed":true,"x-parser-message-name":"<anonymous-message-1>"}}}},"x-parser-spec-parsed":true}';

parser.registerSchemaParser(avroSchemaParser);

describe('parse()', function() {
  it('should parse Avro schema 1.8.2', async function() {
    const result = await parser.parse(inputWithAvro182, { path: __filename });
    expect(JSON.stringify(result.json())).toEqual(outputWithAvro182);
  });
  it('should parse Avro schema 1.9.0', async function() {
    const result = await parser.parse(inputWithAvro190, { path: __filename });
    expect(JSON.stringify(result.json())).toEqual(outputWithAvro190);
  });
  it('should parse Avro schema 1.9.0 with a namespace', async function() {
    const result = await parser.parse(inputWithAvro190WithNamespace, { path: __filename });
    expect(JSON.stringify(result.json())).toEqual(outputWithAvro190WithNamespace);
  });
  it('should parse Avro schema in kafka bindings', async function() {
    const result = await parser.parse(inputWithAvro190WithBindings, { path: __filename });
    expect(JSON.stringify(result.json())).toEqual(outputWithAvro190WithBindings);
  });
  it('should handle additional Avro attributes like', async function() {
    const result = await parser.parse(inputWithAvroAdditionalAttributes, { path: __filename });
    expect(JSON.stringify(result.json())).toEqual(outputWithAvroAdditionalAttributes);
  });
});
