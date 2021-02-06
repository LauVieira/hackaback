/* global it, describe, expect */

const generalFunctions = require('../../src/utils/generalFunctions');

describe('sanitiseObj - function created to use the lib strip-html with any known/unknown object', () => {
  it('It should return the same object', () => {
    const obj = {
      id: 1,
      secretKey: 'uuid_gerado_aleatoriamente',
      status: 'whitePlay',
    };

    const expected = generalFunctions.sanitiseObj(obj);
    expect(expected).toEqual(obj);
  });

  it('It should return the same object, without modifying the array inside', () => {
    const obj = {
      id: 2,
      secretKey: 'uuid_gerado_aleatoriamente',
      status: ['whitePlay', 2],
      obj1: {
        id: 1,
        secretKey: 'uuid_gerado_aleatoriamente',
        status: 'whitePlay',
      },
    };

    const expected = generalFunctions.sanitiseObj(obj);
    expect(expected).toEqual(obj);
  });

  it('It should return the same object, without the html tag', () => {
    const obj = {
      id: 3,
      secretKey: '<h1>malicious key</h1>',
      status: ['whitePlay', 2],
    };
    const expectedObj = {
      id: 3,
      secretKey: 'malicious key',
      status: ['whitePlay', 2],
    };

    const expected = generalFunctions.sanitiseObj(obj);
    expect(expected).toEqual(expectedObj);
  });

  it('It should clean off the array and remove the tags', () => {
    const array = ['<h1>Tag1</h1>', '<ul>not closed ul', '</ul> closing ul tag'];
    const expectedArray = ['Tag1', 'not closed ul', 'closing ul tag'];

    const expected = generalFunctions.sanitiseObj(array);
    expect(expected).toEqual(expectedArray);
  });

  it('should return undefined when function is called with a non-object parameter', () => {
    const parameter = 'not object';

    const expected = generalFunctions.sanitiseObj(parameter);
    expect(expected).toBe(null);
  });
});
