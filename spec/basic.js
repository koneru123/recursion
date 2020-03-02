/* jshint esversion: 6 */

(function() {
  'use strict';

  describe('Basic Requirements', function() {

    describe('1. Factorial', function () {
      var originalFactorial;

      before(function () {
        originalFactorial = factorial;
        factorial = sinon.spy(factorial);
      });

      afterEach(function () {
        if (typeof window === 'object') {
          factorial.reset();
        }

      });

      after(function () {
        factorial = originalFactorial;
      });

      it('should return a number', function () {
        expect(factorial(5)).to.be.a('number');
      });

      it('should return factorial for non-negative integers', function () {
        expect(factorial(0)).to.equal(1);
        expect(factorial(1)).to.equal(1);
        expect(factorial(4)).to.equal(24);
        expect(factorial(5)).to.equal(120);
      });

      it('should return null for negative integers', function () {
        expect(factorial(-5)).to.be.null;
      });

      it('should use recursion by calling self', function () {
        factorial(4);
        expect(factorial.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function () {
        factorial(4);
        factorial.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });


    describe('2. Sum of Integers', function () {
      var originalSum;

      before(function () {
        originalSum = sum;
        sum = sinon.spy(sum);
      });

      afterEach(function () {
        if (typeof window === 'object') {
          sum.reset();
        }
      });

      after(function () {
        sum = originalSum;
      });

      it('should return a number', function () {
        expect(sum([1, 2, 3, 4, 5, 6])).to.be.a('number');
      });

      it('should return the sum of an array of non-negative integers', function () {
        expect(sum([1, 2, 3, 4, 5, 6])).to.equal(21);
        expect(sum([3, 0, 34, 7, 18])).to.equal(62);
      });

      it('should return the sum of an array of negative integers', function () {
        expect(sum([-1, -2, -3, -4, -5, -6])).to.equal(-21);
        expect(sum([-3, -0, -34, -7, -18])).to.equal(-62);
      });

      it('should return the sum of an array of mixed non-negative and negative integers', function () {
        expect(sum([1, -2, 3, -4, 5, -6])).to.equal(-3);
        expect(sum([-12, 34, -56, 78])).to.equal(44);
        expect(sum([3, 0, -34, -7, 18])).to.equal(-20);
      });

      it('should return 0 for empty array', function () {
        expect(sum([])).to.equal(0);
      });

      it('should accept an array with a single integer', function () {
        expect(sum([4])).to.equal(4);
        expect(sum([0])).to.equal(0);
        expect(sum([-37])).to.equal(-37);
      });

      it('should not mutate the input array', function () {
        var input = [1, 2, 3, 4, 5];
        sum(input);
        expect(input).to.eql([1, 2, 3, 4, 5]);
      });

      it('should use recursion by calling self', function () {
        sum([1, 2, 3, 4, 5, 6]);
        expect(sum.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function () {
        sum([1, 2, 3, 4, 5, 6]);
        sum.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });


    describe('3. Sum Integers in Array', function () {
      var originalArraySum;

      before(function () {
        originalArraySum = arraySum;
        arraySum = sinon.spy(arraySum);
      });

      afterEach(function () {
        if (typeof window === 'object') {
          arraySum.reset();
        }
      });

      after(function () {
        arraySum = originalArraySum;
      });

      it('should return a number', function () {
        expect(arraySum([[1], [[2]], 3, 4])).to.be.a('number');
      });

      it('should return the sum of nested arrays containing non-negative integers', function () {
        expect(arraySum([[1], [2, 3], [[4]], 5])).to.equal(15);
        expect(arraySum([[12, [[34], [56]], 78]])).to.equal(180);
        expect(arraySum([3, [0, [34, [7, [18]]]]])).to.equal(62);
      });

      it('should return the sum of nested arrays containing negative integers', function () {
        expect(arraySum([[-1], [-2, -3], [[-4]], -5])).to.equal(-15);
        expect(arraySum([[-12, [[-34], [-56]], -78]])).to.equal(-180);
        expect(arraySum([-3, [0, [-34, [-7, [-18]]]]])).to.equal(-62);
      });

      it('should return the sum of nested arrays containing both non-negative and negative integers', function () {
        expect(arraySum([[1], [-2, 3], [[-4]], 5, -6])).to.equal(-3);
        expect(arraySum([[-12, [[34], [-56]], 78]])).to.equal(44);
        expect(arraySum([3, [0, [-34, [-7, [18]]]]])).to.equal(-20);
      });

      it('should return 0 for empty array', function () {
        expect(arraySum([])).to.equal(0);
      });

      it('should accept an array with a single integer', function () {
        expect(arraySum([4])).to.equal(4);
        expect(arraySum([0])).to.equal(0);
        expect(arraySum([-37])).to.equal(-37);
      });

      it('should not mutate the input array', function () {
        var input = [[1], [[2]], 3, 4];
        arraySum(input);
        expect(input).to.eql([[1], [[2]], 3, 4]);
      });

      it('should use recursion by calling self', function () {
        arraySum([[1], [[2]], 3, 4]);
        expect(arraySum.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function () {
        arraySum([[1], [[2]], 3, 4]);
        arraySum.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });


    describe('4. Check if Even', function () {
      var originalIsEven;

      before(function () {
        originalIsEven = isEven;
        isEven = sinon.spy(isEven);
      });

      afterEach(function () {
        if (typeof window === 'object') {
          isEven.reset();
        }
      });

      after(function () {
        isEven = originalIsEven;
      });

      it('should return a boolean', function () {
        expect(isEven(5)).to.be.a('boolean');
        expect(isEven(8)).to.be.a('boolean');
      });

      it("should not use modulo", function () {
        var stringified = originalIsEven.toString();
        expect(stringified).to.not.contain('%');
        expect(stringified).to.not.contain('modulo');
      });

      it('should return true for even numbers', function () {
        expect(isEven(48)).to.be.true;
        expect(isEven(0)).to.be.true;
      });

      it('should return false for odd numbers', function () {
        expect(isEven(17)).to.be.false;
        expect(isEven(1)).to.be.false;
      });

      it('should work with negative integers', function () {
        expect(isEven(-14)).to.be.true;
        expect(isEven(-31)).to.be.false;
      });

      it('should use recursion by calling self', function () {
        isEven(8);
        expect(isEven.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function () {
        isEven(8);
        isEven.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });


    describe('5. Sum Below', function () {
      var originalSumBelow;

      before(function () {
        originalSumBelow = sumBelow;
        sumBelow = sinon.spy(sumBelow);
      });

      afterEach(function () {
        if (typeof window === 'object') {
          sumBelow.reset();
        }
      });

      after(function () {
        sumBelow = originalSumBelow;
      });

      it('should return a number', function () {
        expect(sumBelow(10)).to.be.a('number');
      });

      it('should return the sum of non-negative integers below given integer', function () {
        expect(sumBelow(0)).to.equal(0);
        expect(sumBelow(1)).to.equal(0);
        expect(sumBelow(2)).to.equal(1);
        expect(sumBelow(7)).to.equal(21);
        expect(sumBelow(12)).to.equal(66);
      });

      it('should return the sum of negative integers above given negative integer', function () {
        expect(sumBelow(-1)).to.equal(0);
        expect(sumBelow(-2)).to.equal(-1);
        expect(sumBelow(-6)).to.equal(-15);
        expect(sumBelow(-11)).to.equal(-55);
      });

      it('should use recursion by calling self', function () {
        sumBelow(5);
        expect(sumBelow.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function () {
        sumBelow(5);
        sumBelow.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });


    describe('6. Integer Range', function () {
      var originalRange;

      before(function () {
        originalRange = range;
        range = sinon.spy(range);
      });

      afterEach(function () {
        if (typeof window === 'object') {
          range.reset();
        }
      });

      after(function () {
        range = originalRange;
      });

      it('should return an array', function () {
        expect(range(2, 7)).to.be.an('array');
      });

      it('should return the integers between two numbers', function () {
        expect(range(3, 8)).to.eql([4, 5, 6, 7]);
        expect(range(127, 131)).to.eql([128, 129, 130]);
      });

      it('should return empty array if no integers in range', function () {
        expect(range(5, 5)).to.eql([]);
        expect(range(2, 3)).to.eql([]);
      });

      it('should accept negative integers', function () {
        expect(range(-9, -4)).to.eql([-8, -7, -6, -5]);
        expect(range(-3, 2)).to.eql([-2, -1, 0, 1]);
        expect(range(-3, -2)).to.eql([]);
        expect(range(-2, -2)).to.eql([]);
      });

      it('should accept starting integer that\'s larger than ending', function () {
        expect(range(7, 2)).to.eql([6, 5, 4, 3]);
        expect(range(3, -3)).to.eql([2, 1, 0, -1, -2]);
        expect(range(-9, -4)).to.eql([-8, -7, -6, -5]);
      });

      it('should use recursion by calling self', function () {
        range(3, 8);
        expect(range.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function () {
        range(3, 8);
        range.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });


    describe('7. Compute Exponent', function () {
      var originalExponent;

      before(function () {
        originalExponent = exponent;
        exponent = sinon.spy(exponent);
      });

      afterEach(function () {
        if (typeof window === 'object') {
          exponent.reset();
        }
      });

      after(function () {
        exponent = originalExponent;
      });

      it('should return a number', function () {
        expect(exponent(4, 3)).to.be.a('number');
      });

      it("should not use complex math", function () {
        expect(originalExponent.toString()).to.not.contain('Math');
      });

      it('should compute exponent of non-negative integers', function () {
        expect(exponent(3, 4)).to.equal(81);
        expect(exponent(12, 5)).to.equal(248832);
        expect(exponent(7, 2)).to.equal(49);
      });

      it('returns 1 when exponent is 0', function () {
        expect(exponent(8, 0)).to.equal(1);
        expect(exponent(244, 0)).to.equal(1);
      });

      it('returns base when exponent is 1', function () {
        expect(exponent(9, 1)).to.equal(9);
        expect(exponent(2300, 1)).to.equal(2300);
      });


      it('should accept negative integer for exponent', function () {
        expect(exponent(4, -2)).to.equal(0.0625);
        expect(exponent(5, -4)).to.equal(0.0016);
        expect(exponent(2, -5)).to.equal(0.03125);
      });

      it('should use recursion by calling self', function () {
        exponent(3, 4);
        expect(exponent.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function () {
        exponent(3, 4);
        exponent.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

      // remove the 'x' to enable test
      xit('optimize for even numbers', function () {
        if (typeof window === 'object') {
          exponent.resetHistory();
        } else {
          exponent.reset();
        }
        exponent(3, 4);
        expect(exponent.callCount).to.be.at.most(4);

        if (typeof window === 'object') {
          exponent.resetHistory();
        } else {
          exponent.reset();
        }
        exponent(12, 5);
        expect(exponent.callCount).to.be.at.most(5);

        if (typeof window === 'object') {
          exponent.resetHistory();
        } else {
          exponent.reset();
        }
        exponent.reset();
        exponent(19, 7);
        expect(exponent.callCount).to.be.at.most(6);
      });

      // remove the 'x' to enable test
      xit('should accept negative integer for base', function () {
        expect(exponent(-3, 4)).to.equal(81);
        expect(exponent(-12, 5)).to.equal(-248832);
        expect(exponent(-7, 2)).to.equal(49);
        expect(exponent(-7, 4)).to.equal(2401);
        expect(exponent(-3, 5)).to.equal(-243);
      });

    });


    describe('8. Power of Two', function () {
      var originalPowerOfTwo;

      before(function () {
        originalPowerOfTwo = powerOfTwo;
        powerOfTwo = sinon.spy(powerOfTwo);
      });

      afterEach(function () {
        if (typeof window === 'object') {
          powerOfTwo.reset();
        }
      });

      after(function () {
        powerOfTwo = originalPowerOfTwo;
      });

      it('should return a boolean', function () {
        expect(powerOfTwo(5)).to.be.a('boolean');
        expect(powerOfTwo(8)).to.be.a('boolean');
      });

      it('should return true for powers of two', function () {
        expect(powerOfTwo(1)).to.be.true;
        expect(powerOfTwo(2)).to.be.true;
        expect(powerOfTwo(128)).to.be.true;
      });

      it('should return false when input is not power of two', function () {
        expect(powerOfTwo(0)).to.be.false;
        expect(powerOfTwo(10)).to.be.false;
        expect(powerOfTwo(270)).to.be.false;
      });

      it('should use recursion by calling self', function () {
        powerOfTwo(16);
        expect(powerOfTwo.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function () {
        powerOfTwo(16);
        powerOfTwo.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });


    describe('9. Reverse String', function () {
      var originalReverse;

      before(function () {
        originalReverse = reverse;
        reverse = sinon.spy(reverse);
      });

      afterEach(function () {
        if (typeof window === 'object') {
          reverse.reset();
        }
      });

      after(function () {
        reverse = originalReverse;
      });

      it('should return a string', function () {
        expect(reverse('traf')).to.be.a('string');
      });

      it('should return a string in reverse', function () {
        var input = 'All my base are belong to you.';
        var tupni = '.uoy ot gnoleb era esab ym llA';
        expect(reverse(input)).to.equal(tupni);
      });

      it('should not use native reverse method', function () {
        // Spying on Array.prototype.reverse in testSupport.js
        if (typeof window !== 'object') {
          Array.prototype.reverse.resetHistory();
        }
        reverse('traf');
        expect(Array.prototype.reverse.called).to.be.false;
      });

      it('should use recursion by calling self', function () {
        reverse('orangutan');
        expect(reverse.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function () {
        reverse('orangutan');
        reverse.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });


    describe('10. Palindrome', function () {
      var originalPalindrome;

      before(function () {
        originalPalindrome = palindrome;
        palindrome = sinon.spy(palindrome);
      });

      afterEach(function () {
        if (typeof window === 'object') {
          palindrome.reset();
        }
      });

      after(function () {
        palindrome = originalPalindrome;
      });

      it('should return a boolean', function () {
        expect(palindrome('rotor')).to.be.a('boolean');
        expect(palindrome('motor')).to.be.a('boolean');
      });

      it('should not use native reverse method', function () {
        if (typeof window !== 'object') {
          Array.prototype.reverse.resetHistory();
        }
        palindrome('hannah');
        expect(Array.prototype.reverse.called).to.be.false;
      });

      it('should return true for palindromes', function () {
        if (typeof window !== 'object') {
          Array.prototype.reverse.resetHistory();
        }
        expect(palindrome('o')).to.be.true;
        expect(palindrome('racecar')).to.be.true;
        expect(palindrome('saippuakivikauppias')).to.be.true;
      });

      it('should return false for non-palindromes', function () {
        expect(palindrome('hi')).to.be.false;
        expect(palindrome('orangutan')).to.be.false;
      });

      it('should ignore spaces and capital letters', function () {
        expect(palindrome('Rotor')).to.be.true;
        expect(palindrome('sAip puaki v iKaup Pias')).to.be.true;
      });

      it('should use recursion by calling self', function () {
        palindrome('racecar');
        expect(palindrome.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function () {
        palindrome('racecar');
        palindrome.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

  });
}());
