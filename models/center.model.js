const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// Define your schema
const centerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  openTime: {
    type: String,
    required: true
  },
  closeTime: {
    type: String,
    required: true
  },
  dosageLeft: {
    type: Number,
    required: true
  }
});

const Center = mongoose.model('center',centerSchema);

module.exports=Center;