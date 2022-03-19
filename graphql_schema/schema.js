const _ = require("lodash");
const {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLObjectType,
} = require("graphql");

//  array section
const MinerHomeDetailArray = new Array(
  {
    id: '1',
    fullName: "Jose Macro",
    address: "123 mascow Madrigo"
  },
  {
    id: '2',
    fullName: "Luina Maisedis",
    address: "234 Lagos US"
  },
  {
    id: '3',
    fullName: "Jose Macro",
    homeAddress: "345 Lusaka Zambia"
  },
);

const MinerWorkDetailArray = new Array(
  {
    id: '1',
    bossName: "Luwi",
    workAddress: "345 SamfyaBeach Zambia"
  },
  {
    id: '2',
    bossName: "Jack",
    workAddress: "345 Kasama Zambia"
  },
  {
    id: '3',
    bossName: "B",
    homeAddress: "345 Choma Zambia"
  },
);

// graphql section
const MinerDetail = new GraphQLObjectType({
  name: "MinerType",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    fullName: {
      type: GraphQLString
    },
    homeAddress: {
      type: GraphQLString
    },
    workdetails: {
      type: MinerWorkDetail,
      resolve(parent, args){
        console.log(parent)
        return _.find(MinerWorkDetailArray, {
          id: parent.id
        })
      }
    }
  })
});

const MinerWorkDetail = new GraphQLObjectType({
  name: "MinerWorkDetail",
  fields: () => ({
    id: { type: GraphQLID },
    companyName: { type: GraphQLString },
    workAddress: { type: GraphQLString }
  })
});

const MinerDetailQuery = new GraphQLObjectType({
  name: "MinerDetail",
  fields: {
    miner: {
      type: MinerDetail,
      args: {id: { type: GraphQLID }
      },
      resolve(parent, args){
        return _.find(MinerHomeDetailArray, { id: args.id })
      }
    },
    work: {
      type: MinerDetail,
      args: { id: { type: GraphQLID }
      },
      resolve(parent, args){
        return _.find(MinerWorkDetailArray, { id: args.id })
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: MinerDetailQuery
})
