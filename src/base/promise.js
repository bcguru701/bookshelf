import promiseModule from 'bluebird/js/main/promise';
import { deprecate } from '../helpers';

const Promise = promiseModule();

Promise.prototype.yield = function() {
  deprecate('.yield', '.return')
  return this.return.apply(this, arguments);
}
Promise.prototype.ensure = function() {
  deprecate('.ensure', '.finally')
  return this.finally.apply(this, arguments);
}
Promise.prototype.otherwise = function() {
  deprecate('.otherwise', '.catch')
  return this.catch.apply(this, arguments);
}
Promise.prototype.exec = function() {
  deprecate('bookshelf.exec', 'bookshelf.asCallback')
  return this.nodeify.apply(this, arguments);
};

export default Promise;
