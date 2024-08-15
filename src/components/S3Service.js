// src/components/AwsS3Service.js
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-2"
});

const s3 = new AWS.S3();

export const uploadFileToS3 = (file, onSuccess, onError) => {
  const params = {
    Bucket: "shiseido-data",
    Key: "data.csv",
    Body: file,
    ContentType: file.type
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Error uploading file:", err);
      onError("Error uploading file");
    } else {
      console.log("File uploaded successfully:", data.Location);
      onSuccess("File uploaded successfully!");
    }
  });
};
