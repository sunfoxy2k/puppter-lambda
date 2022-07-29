FROM amazon/aws-lambda-nodejs:14

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION=us-west-1

# Install Chrome to get all of the dependencies installed
# RUN yum install -y amazon-linux-extras
# RUN amazon-linux-extras install epel -y
# RUN yum install -y chromium

ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    AWS_REGION=$AWS_REGION

COPY app.js package*.json ${LAMBDA_TASK_ROOT}/

COPY website-crawler ${LAMBDA_TASK_ROOT}/website-crawler

RUN npm install

CMD [ "/app.lambdaHandler" ]