import aws from 'aws-sdk';

aws.config.update({
  region: 'ap-northeast-1',
});

const sm = new aws.SecretsManager();

export class SecretFetchError extends Error {}

export const getSecretContent = async (key) => {
  const result = await sm
    .getSecretValue({
      SecretId: key,
    })
    .promise();
  if (!result.SecretString) {
    throw new SecretFetchError(`Secret(${key}) fetch failed`);
  }
  return JSON.parse(result.SecretString);
};
