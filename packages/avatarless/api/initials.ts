import { NowRequest, NowResponse } from '@vercel/node';
import { pipeLogging, pipeCORS, pipeRequirements, pipeAvatarlessInitials } from './_lib/pipes';

export default async function handler(req: NowRequest, res: NowResponse): Promise<void> {
  try {
    // Log everything
    pipeLogging(req, res);

    // Apply COORS
    pipeCORS(req, res);

    // Check all requirements from request
    pipeRequirements(req, res, ['_initials']);

    // Avatarless generator
    pipeAvatarlessInitials(req, res);
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(e);
  }
}
