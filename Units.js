const toCamel = (v) => `${v.split("")[0].toUpperCase()}${v.substring(1)}`;
const db = [
  {
    name: "liter",
    unit: "l",
    child: "gal"
  },
  {
    name: "gallon",
    unit: "gal",
    child: "l"
  },
  {
    name: "mile",
    unit: "mi",
    child: "km"
  },
  {
    name: "kilometer",
    unit: "km",
    child: "mi"
  },
  {
    name: "pound",
    unit: "lbs",
    child: "kg"
  },
  {
    name: "kilogram",
    unit: "kg",
    child: "lbs"
  }
].map(o => {
    return {
        ...o,
        plural: o.name + "s"
    }
}).map(o => { 
    return {
        ...o,
        upper: {
            name: o.name.toUpperCase(),
            unit: o.unit.toUpperCase(),
            child: o.child.toUpperCase(),
            plural: o.plural.toUpperCase()
        },
        camel: {
            name: toCamel(o.name),
            unit: toCamel(o.unit),
            plural: toCamel(o.plural),
            child: toCamel(o.child)
        }
    }
});

const names = [
    ...db.map(o => o.name),
    ...db.map(o => o.plural),
    ...db.map(o => o.upper.name),
    ...db.map(o => o.upper.plural),
    ...db.map(o => o.camel.name),
    ...db.map(o => o.camel.plural),
];

const units = [
    ...db.map(o => o.unit),
    ...db.map(o => o.upper.unit),
    ...db.map(o => o.camel.unit),
]

const unitChild = {};
const unitName = {};
for(const u of db) {
    unitChild[u.unit] = u.child;
    unitName[u.unit] = u.name;
    unitChild[u.upper.unit] = u.upper.child;
    unitName[u.upper.unit] = u.upper.name;
    unitChild[u.camel.unit] = u.camel.child
    unitName[u.camel.unit] = u.camel.name;
}

function Units() {
  this.getDb = () => db;
  this.getNames = () => names;
  this.getUnits = () => units;
  this.getUnitChild = () => unitChild;
  this.getUnitName = () => unitName;
}

module.exports = Units;

