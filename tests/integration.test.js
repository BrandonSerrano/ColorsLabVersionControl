const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadCodeJs(domElements, xhrMockFactory) {
  const code = fs.readFileSync(path.resolve(__dirname, '../public/js/code.js'), 'utf8');
  const sandbox = {
    console,
    Date,
    parseInt,
    JSON,
    document: {
      cookie: '',
      getElementById: (id) => domElements[id] || { value: '', innerHTML: '' },
      getElementsByTagName: () => [{ innerHTML: '' }],
    },
    window: {
      location: { href: '' },
    },
    XMLHttpRequest: xhrMockFactory,
  };
  const context = vm.createContext(sandbox);
  vm.runInContext(code, context);
  return {
    context,
    evalInContext: (expr) => vm.runInContext(expr, context),
  };
}

describe('Login integration test (client + API JSON contract)', () => {
  test('successful login response sets userId, saves cookie, and redirects to color.html', () => {
    const dom = {
      loginName: { value: 'rick' },
      loginPassword: { value: 'secret' },
      loginResult: { innerHTML: '' },
    };

    class MockXHR {
      open(method, url) {
        this.method = method;
        this.url = url;
      }
      setRequestHeader() {}
      send(body) {
        this.requestBody = JSON.parse(body);
        this.readyState = 4;
        this.status = 200;
        this.responseText = JSON.stringify({
          id: 7,
          firstName: 'Rick',
          lastName: 'Sanchez',
          error: '',
        });
        if (this.onreadystatechange) {
          this.onreadystatechange();
        }
      }
    }

    const { context, evalInContext } = loadCodeJs(dom, MockXHR);
    evalInContext('doLogin()');

    expect(evalInContext('userId')).toBe(7);
    expect(evalInContext('firstName')).toBe('Rick');
    expect(evalInContext('lastName')).toBe('Sanchez');
    expect(context.window.location.href).toBe('color.html');
    expect(context.document.cookie).toContain('userId=7');
  });

  test('failed login response (id: 0) displays error message', () => {
    const dom = {
      loginName: { value: 'nobody' },
      loginPassword: { value: 'wrong' },
      loginResult: { innerHTML: '' },
    };

    class FailingMockXHR {
      open() {}
      setRequestHeader() {}
      send() {
        this.readyState = 4;
        this.status = 200;
        this.responseText = JSON.stringify({
          id: 0,
          firstName: '',
          lastName: '',
          error: 'No Records Found',
        });
        if (this.onreadystatechange) {
          this.onreadystatechange();
        }
      }
    }

    const { evalInContext } = loadCodeJs(dom, FailingMockXHR);
    evalInContext('doLogin()');

    expect(dom.loginResult.innerHTML).toBe('User/Password combination incorrect');
  });
});