import AWS from 'aws-sdk';

const config = {
  accessKeyId: 'AKIA3KZVK3RM6V72UAHV',
  secretAccessKey: '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',
  region: 'ap-south-1',
};

const s3 = new AWS.S3(config);

export default s3;
