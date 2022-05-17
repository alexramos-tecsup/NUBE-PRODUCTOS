const aws = require("aws-sdk");
const fs = require("fs");
//require("dotenv").config();
aws.config.update({
  region: "us-east-1",
  accessKeyId: process.env.REACT_APP_AWS_ID,
  secretAccessKey: process.env.REACT_APP_AWS_KEY,
});

// Create S3 service object
let s3 = new aws.S3();

// Create the parameters for calling listObjects
var bucketParams = {
  Bucket: "productos-bucket",
};

export function upload(file) {
  //const filestream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: "productos-bucket",
    Body: file,
    Key: file.name,
  };
  return s3.upload(uploadParams).promise();
}

/* 
const res = s3.listObjects(bucketParams, function (err, data) {
  console.log(res);
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});

export default s3;

 */

/* async function name(params) {
  try {
    aws.config.update({
      accessKeyId: "llave",
      secretAccessKey: "secret",
      region: "us-east-1",
    });
    const s3 = new aws.s3();
    const res = await s3.listObjectsV2({
      Bucket: "sqb-sample-2018",
    });
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}
 */
