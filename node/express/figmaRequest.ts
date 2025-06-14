import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Fetches a Figma file's JSON using the REST API.
 *
 * Prerequisites:
 * 1. Create a personal access token in Figma → Settings → Personal access tokens.
 * 2. Store it in your environment as FIGMA_TOKEN, e.g. add the line below to a .env file
 *    FIGMA_TOKEN=YOUR_PERSONAL_ACCESS_TOKEN
 *
 * @param fileKey The file key (the part of the Figma URL following /file/ and before the next /)
 * @returns The full JSON response containing the document, components, styles, etc.
 */
export async function getFigmaFile(fileKey: string) {
  if (!process.env.FIGMA_TOKEN) {
    throw new Error('Missing FIGMA_TOKEN in environment variables');
  }
  

  const url = `https://api.figma.com/v1/files/${fileKey}`;
  const headers = {
    'X-Figma-Token': process.env.FIGMA_TOKEN as string,
  };

  const response = await axios.get(url, { headers });
  return response.data;
}

// ---------------------------------------------------------------------------
// Example usage (run this file directly with ts-node):
//   ts-node figmaRequest.ts <file-key>
// ---------------------------------------------------------------------------
if (require.main === module) {
  const [fileKey] = process.argv.slice(2);
  if (!fileKey) {
    console.error('Usage: ts-node figmaRequest.ts <file-key>');
    process.exit(1);
  }

  getFigmaFile(fileKey)
    .then((data) => {
      console.log(JSON.stringify(data, null, 2));
    })
    .catch((err) => {
      console.error('Failed to fetch Figma file:', err.message);
    });
}
