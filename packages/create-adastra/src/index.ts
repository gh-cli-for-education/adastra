import { downloadTemplate } from "giget";

export const main = async () => {
  try {
    await downloadTemplate("gh:gh-cli-for-education/astro-example", {
      force: true,
      provider: "github",
      cwd: "./prueba",
      dir: ".",
    });
  } catch (err: any) {
    console.error(err.message);
  }
};
