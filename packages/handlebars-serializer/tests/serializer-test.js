import Handlebars from 'handlebars';
import { equalHBS } from "test/support/assertions";

module('serializer');

// Content

test('content', function() {
  equalHBS('foo');
});


// Partial

test('partial', function() {
  equalHBS('{{>hbs}}');
});

test('partial with content', function() {
  equalHBS('{{>foo bar}}');
});

test('partial with complex name', function() {
  equalHBS('{{>foo.bar}}');
});


// Mustache

test('simple mustaches', function() {
  equalHBS('{{foo}}');
});

test('unescaped mustaches', function() {
  equalHBS('{{{foo}}}');
});

test('simple mustaches with data', function() {
  equalHBS('{{@foo}}');
});

test('mustaches with parameters', function() {
  equalHBS('{{foo bar}}');
});

test('mustaches with string parameters', function() {
  equalHBS('{{foo "bar"}}');
});

test('mustaches with NUMBER parameters', function() {
  equalHBS('{{foo 1}}');
});

test('mustaches with BOOLEAN parameters', function() {
  equalHBS('{{foo true}}');
  equalHBS('{{foo false}}');
});

test('mustaches with DATA parameters', function() {
  equalHBS('{{foo @bar}}');
});

test('mustaches with multiple parameters', function() {
  equalHBS('{{foo bar.baz baar}}');
});

test('mustaches with hash arguments', function() {
  equalHBS('{{foo bar=baz}}');
});

test('mustaches with multiple hash arguments', function() {
  equalHBS('{{foo bar=baz baar=baaz}}');
});

test('mustaches with hash arguments with string values', function() {
  equalHBS('{{foo bar="baz"}}');
});

test('mustaches with multiple hash arguments with string values', function() {
  equalHBS('{{foo bar="baz" baar="baaz"}}');
});

test('mustaches with hash arguments with number values', function() {
  equalHBS('{{foo bar=1}}');
});

test('mustaches with hash arguments with boolean values', function() {
  equalHBS('{{foo bar=true}}');
  equalHBS('{{foo bar=false}}');
});

test('mustaches with hash arguments with data values', function() {
  equalHBS('{{foo bar=@baz}}');
});

test('mustaches with multiple hash arguments with values of mixed types', function() {
  equalHBS('{{foo bar=baz baar="baaz"}}');
});


// Comments

test('comment', function() {
  equalHBS('{{!-- this is a comment --}}');
});

test('multi-line comment', function() {
  equalHBS('{{!--\nthis is a multi-line comment\n--}}');
});


// Blocks

test('empty blocks', function() {
  equalHBS('{{#foo bar}}{{/foo}}');
});

test('block with content', function() {
  equalHBS('{{#foo}} bar {{/foo}}');
});


// Inverse sections

test('inverse section', function() {
  equalHBS('{{#foo}} bar {{^}} baz {{/foo}}');
});
