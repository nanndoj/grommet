// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

module.exports = {
  validate: function (rules) {
    var result = {
      valid: true,
      errors: {},
      firstError: null
    };

    rules.forEach(function (rule) {
      if (rule.hasOwnProperty('test')) {
        if (rule.test) {
          result.errors[rule.field] = rule.message;
          result.valid = false;
          result.firstError = result.firstError || rule.field;
        }
      } else if (rule.hasOwnProperty('tests')) {
        rule.tests.some(function (test) {
          if (test.test) {
            result.errors[rule.field] = test.message;
            result.valid = false;
            result.firstError = result.firstError || rule.field;
            return true;
          }
        });
      }
    });

    return result;
  }
};
