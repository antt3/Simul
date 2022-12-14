import boto3
import botocore
import os
import uuid


BUCKET_NAME = os.environ.get("S3_BUCKET_NAME")

S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"jpg"}


s3 = boto3.client(
   "s3",
   aws_access_key_id = os.environ.get("S3_ACCESS_KEY_ID"),
   aws_secret_access_key = os.environ.get("S3_SECRET_ACCESS_KEY"),
   region_name = os.environ.get("S3_AWS_REGION")
)


def is_jpg(filename):
    print(filename)
    print("." in filename)
    return "." in filename and \
        filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    try:
        # print('----------response----------', response, '---------------------')

        # print(
        #     '--s3--', s3,
        #     '--bucket location--', f"http://{BUCKET_NAME}.s3.amazonaws.com/",
        #     '--access key id--', os.environ.get("S3_ACCESS_KEY_ID"),
        #     '--secret key--', os.environ.get("S3_SECRET_ACCESS_KEY"),
        #     '--region--', os.environ.get('S3_AWS_REGION'),
        #     '--file:--', file,
        #     '--file.filename--',file.filename,
        #     '--file.content_type--', file.content_type
        # )

        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}


def delete_object_from_bucket(source):
    # print('------------source-----------', source, '----------------------------')
    response = s3.delete_object(Bucket=BUCKET_NAME, Key=source)
    return(response)