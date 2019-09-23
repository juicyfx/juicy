import fs from "fs";
import path from "path";
import util from "util";

const fileExist = util.promisify(fs.exists);
const fileReaddir = util.promisify(fs.readdir);
const fileMkdir = util.promisify(fs.mkdir);
const fileCopyFile = util.promisify(fs.copyFile);

const FONTS_DIR = path.resolve(__dirname, '../../api/_fonts');
const TMP_FONTS_DIR = '/tmp/.fonts';

export async function installFonts(): Promise<void> {
  // Don't install fonts multiple times
  if (await fileExist(TMP_FONTS_DIR)) return;

  console.log(`Copy fonts ${FONTS_DIR}`);
  console.log(`ENV HOME=${process.env.HOME}`);

  // Create fonts folder
  await fileMkdir(TMP_FONTS_DIR);

  // Read all repo fonts
  const fonts = await fileReaddir(FONTS_DIR);

  // Copy fonts
  fonts.forEach(async f => {
    const oldPath = path.join(FONTS_DIR, f);
    const newPath = path.join(TMP_FONTS_DIR, f);

    console.log(`Copy font ${oldPath} into ${newPath}`);
    await fileCopyFile(oldPath, newPath);
  })
}
