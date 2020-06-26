function normalizeEvent(event) {
  if (event.Action === 'Invoke') {
    const invokeEvent = JSON.parse(event.body);

    const {
      method, path, headers, encoding,
    } = invokeEvent;

    let { body } = invokeEvent;

    if (body) {
      if (encoding === 'base64') {
        body = Buffer.from(body, encoding);
      } else if (encoding === undefined) {
        body = Buffer.from(body);
      } else {
        throw new Error(`Unsupported encoding: ${encoding}`);
      }
    }

    return {
      method,
      path,
      headers,
      body,
    };
  }

  const {
    httpMethod: method, path, headers, body,
  } = event;

  return {
    method,
    path,
    headers,
    body,
  };
}

function transformToAwsResponse(payload) {
  return {
    statusCode: 200,
    body: Buffer.from(JSON.stringify(payload)).toString('base64'),
    headers: {
      "Content-Type": "application/json"
    },
    encoding: 'base64',
  };
}

async function launcher(event) {
  if (process.env.NOW_PURE_DEBUG) {
    console.log('Event', event);
  }

  const awsRequest = normalizeEvent(event);

  if (process.env.NOW_PURE_DEBUG) {
    console.log('Normalized event', awsRequest);
  }

  return transformToAwsResponse(awsRequest);
}

exports.launcher = launcher;
