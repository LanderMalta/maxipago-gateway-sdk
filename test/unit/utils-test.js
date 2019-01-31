var assert = require('assert');

describe('CORE FUNCTIONS', function () {
  describe('Utils', function () {
    it('return an obj with only model attributes and in correct order', function () {
      var strict_obj = {
        a: undefined,
        b: undefined,
        c: {
          d: undefined
        }
      };
      var to_format = {
        d: 'd',
        c: {
          e: 'e',
          d: 'd',
          f: 'f'
        },
        b: 'b',
        a: 'a'
      };
      var expected = {
        a: 'a',
        b: 'b',
        c: {
          d: 'd'
        }
      };

      assert.notDeepEqual(Object.keys(to_format), Object.keys(strict_obj));
      assert.notDeepEqual(to_format, expected);

      var result = require('../../lib/utils/utils').formatObject(to_format, strict_obj);

      assert.deepEqual(result, expected);
      assert.deepEqual(Object.keys(result), Object.keys(strict_obj));
    });
  });
});
