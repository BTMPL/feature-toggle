const featureToggle = require('../index.js');
const expect = require('chai').expect;

describe("featureToggle", () => {
  it("allows to set configuration", () => {
    featureToggle.set({
      root: {
        child: {
          flag1: false
        }
      }
    });

    expect(featureToggle.isDisabled('root.child.flag1')).to.equal(true);
    expect(featureToggle.isDisabled('root.child.flag2')).to.equal(false);
  });

  it("allows to update configuration", () => {
    featureToggle.set({
      root: {
        child: {
          flag2: false
        }
      }
    });
    expect(featureToggle.isDisabled('root.child.flag1')).to.equal(true);
    expect(featureToggle.isDisabled('root.child.flag2')).to.equal(true);
  });

  it("marks not-defined features as active by default", () => {
    expect(featureToggle.isEnabled('root.notDefined')).to.equal(true);
  });

  it("allows to change the not-defined features to be disabled", () => {
    featureToggle.assumeEnabledByDefault = false;
    expect(featureToggle.isDisabled('root.notDefinedWillBeFalse')).to.equal(true);
  });

  it("treats object values (nested flag set) as valid response", () => {
    featureToggle.assumeEnabledByDefault = true;
    expect(featureToggle.isEnabled("root")).to.equal(true);
  });

  it("allows usage of functions as flag value", () => {
    featureToggle.set({
      root: {
        functionTest: (a,b) => a && b
      }
    });

    expect(featureToggle.isEnabled('root.functionTest', true, true)).to.equal(true);

    featureToggle.assumeEnabledByDefault = false;
    expect(featureToggle.isEnabled('root.missingFunctionName', true, true)).to.equal(false);
  });

  it("can be reset to default state", () => {
    featureToggle.assumeEnabledByDefault = false;
    featureToggle.set({
      isSet: true
    });
    expect(featureToggle.isEnabled('isSet')).to.equal(true);
    featureToggle.reset();
    expect(featureToggle.isEnabled('isSet')).to.equal(false);
  })
});
