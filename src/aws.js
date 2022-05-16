const aws = require("aws-sdk");

aws.config.update({ region: "us-east-1" });

// Create S3 service object
let s3 = new aws.S3();

// Create the parameters for calling listObjects
var bucketParams = {
  Bucket: "productos-bucket",
};

// Call S3 to obtain a list of the objects in the bucket
s3.listObjects(bucketParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});

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
