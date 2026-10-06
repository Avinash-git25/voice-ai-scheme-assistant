const AWS_LAMBDA_URL = process.env.AWS_LAMBDA_URL || 'https://3hepd6fwqnejouzr4jxfwxk2cu0shvee.lambda-url.us-east-1.on.aws';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const awsRes = await fetch(`${AWS_LAMBDA_URL}/health`);
    const awsData = await awsRes.json();
    return res.status(200).json({ status: 'connected', aws: awsData, lambdaUrl: AWS_LAMBDA_URL });
  } catch (e) {
    return res.status(200).json({ status: 'offline', error: e.message, lambdaUrl: AWS_LAMBDA_URL });
  }
}
