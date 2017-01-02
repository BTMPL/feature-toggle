## USAGE

```var featureToggle = require("feature-toggle");

featureToggle.set({
  root: {
    child: {
      flag1: false
    }
  }
});

if(featureToggle.isEnabled("root.child.flag1")) {
  console.log("root.child.feature1 is enabled");
}
else {
  console.log("root.child.feature1 is disabled");
}
```

## API

```featureToggle.set(Object flagset)```

Load or update an existing flag set. The value should be an object with each
leaf being either a boolean or function that when evaluate returns a boolean.

Calling the funciton multiple time will merge the flag set using [_.merge](https://lodash.com/docs#merge)

```featureToggle.reset()```

Resets the flag set to an empty set. Useful when you want to replace the current
set with a new one, and not update it.

```featureToggle.isEnabled(String, [param1, param2, ....])```

Checks the flag set against an selector supplied as a `dot.string.notation`.
If the expected value is a function, you can pass additional parameters which
will be then passed to the function at runtime.

```featureToggle.isDisabled(String, [param1, param2, ...])```

Returns the opposite of `isEnabled`

```featureToggle.data```

Object holding the current flag set. Please use `set()` and `reset()` to alter.

```featureToggle.assumeEnabledByDefault```

The value to be returned when the queries key (using `isEnabled`, `isDisabled`)
fails to find the value in the flag set. By default `true` allowing the lib to
be used to disable functionality rather than enable it.

```featureToggle.resolveNested```

Decides if the app can query for whole flag objects as valid `isEnabled` and
`isDisabled` response. This can be useful to lock/unlock a whole gorup of
features and each individual one later on.

```featureToggle.resolveNested()```

If `featureToggle.resolveNested` is enabled, deides on value to be returned when
resolving with an object. Returns `featureToggle.assumeEnabledByDefault` by
default.
