const AWS=require('aws-sdk');

const uploadToS3=(data,filename)=>{
    console.log('Data:',data)
  const BUCKET_NAME =mentioned bucket name;
  const IAM_USER_KEY =mentioned key;
  const IAM_USER_SECRET =mentioned secret access ;
  
  let s3bucket = new AWS.S3({
    accesskeyId:IAM_USER_KEY,
    secretAccessKey:IAM_USER_SECRET
   
  })
  
    var params={
      Bucket:BUCKET_NAME,
      Key:filename,
      Body:data,
      ACL:'public-read'
    }
    return new Promise((resolve,reject)=>{
      s3bucket.upload(params,(err,s3response)=>{
        if(err){
          console.log('something went wrong',err)
          reject(err)
        }
        else{
          console.log('success',s3response)
         resolve(s3response.Location)
        }
      })
    
    })
   
  
  }
  module.exports={
    uploadToS3
  }
