const md5 = require('../public/js/md5');

describe('Front-end unit tests', () => {
  test('md5 computes expected hash for known strings', () => {
    // Standard MD5 test vector: md5("") === "d41d8cd98f00b204e9800998ecf8427e"
    expect(md5('')).toBe('d41d8cd98f00b204e9800998ecf8427e');
    expect(md5('WeLoveCOP4331')).toMatch(/^[a-f0-9]{32}$/);
  });

  test('cookie string parsing extracts userId and name fields', () => {
    const cookieStr = 'firstName=Test,lastName=User,userId=42';
    const parsed = {};
    cookieStr.split(',').forEach((part) => {
      const [key, val] = part.trim().split('=');
      parsed[key] = val;
    });

    expect(parsed.firstName).toBe('Test');
    expect(parsed.lastName).toBe('User');
    expect(parseInt(parsed.userId, 10)).toBe(42);
  });
});