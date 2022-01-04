function cov_1fpgom17hc() {
  var path = "C:\\Users\\lakhs\\delivery\\Front Chats Websockets\\src\\main.js";
  var hash = "ffcd76d8a7284df4c6c2e5c583d4e7288731d51a";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\lakhs\\delivery\\Front Chats Websockets\\src\\main.js",
    statementMap: {
      "0": {
        start: {
          line: 10,
          column: 12
        },
        end: {
          line: 10,
          column: 26
        }
      },
      "1": {
        start: {
          line: 11,
          column: 0
        },
        end: {
          line: 16,
          column: 14
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0,
      "1": 0
    },
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "ffcd76d8a7284df4c6c2e5c583d4e7288731d51a"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1fpgom17hc = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1fpgom17hc();
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import cookies from 'vue3-cookies';
import Toaster from '@meforma/vue-toaster';
import VueAxios from 'vue-axios';
import axios from "./http";
const app = (cov_1fpgom17hc().s[0]++, createApp(App));
cov_1fpgom17hc().s[1]++;
app.use(store).use(router).use(cookies).use(Toaster).use(VueAxios, axios).mount('#app');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY3JlYXRlQXBwIiwiQXBwIiwic3RvcmUiLCJyb3V0ZXIiLCJjb29raWVzIiwiVG9hc3RlciIsIlZ1ZUF4aW9zIiwiYXhpb3MiLCJhcHAiLCJ1c2UiLCJtb3VudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZVk7Ozs7Ozs7OztBQWZaLFNBQVNBLFNBQVQsUUFBMEIsS0FBMUI7QUFDQSxPQUFPQyxHQUFQLE1BQWdCLFdBQWhCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixTQUFsQjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsVUFBbkI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLGNBQXBCO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQixzQkFBcEI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLFdBQXJCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixRQUFsQjtBQUVBLE1BQU1DLEdBQUcsNkJBQUdSLFNBQVMsQ0FBQ0MsR0FBRCxDQUFaLENBQVQ7O0FBQ0FPLEdBQUcsQ0FBQ0MsR0FBSixDQUFRUCxLQUFSLEVBQ0NPLEdBREQsQ0FDS04sTUFETCxFQUVDTSxHQUZELENBRUtMLE9BRkwsRUFHQ0ssR0FIRCxDQUdLSixPQUhMLEVBSUNJLEdBSkQsQ0FJS0gsUUFKTCxFQUllQyxLQUpmLEVBS0NHLEtBTEQsQ0FLTyxNQUxQIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQXBwIH0gZnJvbSAndnVlJ1xyXG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwLnZ1ZSdcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUnXHJcbmltcG9ydCByb3V0ZXIgZnJvbSAnLi9yb3V0ZXInXHJcbmltcG9ydCBjb29raWVzIGZyb20gJ3Z1ZTMtY29va2llcydcclxuaW1wb3J0IFRvYXN0ZXIgZnJvbSAnQG1lZm9ybWEvdnVlLXRvYXN0ZXInO1xyXG5pbXBvcnQgVnVlQXhpb3MgZnJvbSAndnVlLWF4aW9zJ1xyXG5pbXBvcnQgYXhpb3MgZnJvbSBcIi4vaHR0cFwiXHJcblxyXG5jb25zdCBhcHAgPSBjcmVhdGVBcHAoQXBwKTtcclxuYXBwLnVzZShzdG9yZSlcclxuLnVzZShyb3V0ZXIpXHJcbi51c2UoY29va2llcylcclxuLnVzZShUb2FzdGVyKVxyXG4udXNlKFZ1ZUF4aW9zLCBheGlvcylcclxuLm1vdW50KCcjYXBwJylcclxuIl19