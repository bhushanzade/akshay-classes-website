const { GetHomeStats, UpdateHomeStats } = require("../service/home-stats");
const catchAsync = require("../util/catch-async");

exports.getHomeStats = catchAsync(async (req, res) => {
  const item = await GetHomeStats(req.connection);
  return res.json(item);
});

exports.updateHomeStat = catchAsync(async (req, res) => {
  await req.connection.beginTransaction();
  await UpdateHomeStats(req.connection, req.body);
  await req.connection.commit();
  return res.json({
    message: "Stats updated successfully."
  });

});


const { createCanvas, loadImage } = require('canvas');

exports.editImage = async (req, res) => {

  try {
    const image = await loadImage("images/gold-base-certificate.jpg");
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    ctx.font = 'bold italic 250px Verdana';
    ctx.fillStyle = '#fff'; // Text color
    ctx.fillText("2024", 80, 340);
    ctx.font = 'bold italic 60px Verdana';
    ctx.fillText("June", 80, 420);
    ctx.font = 'bold 80px Arial';
    ctx.fillStyle = '#000'; // Text color
    const text = "Zade Group Company";
    const textWidth = ctx.measureText(text).width;
    // console.log("textWidth", textWidth);
    // console.log("image width", (image.width));
    // console.log("image width x axis", (image.width / 1.68));
    // console.log("modift image width x axis", (image.width - textWidth));
    ctx.fillText(text, (image.width - (textWidth + 200)), (image.height / 2));
    ctx.font = 'bold 60px Arial';
    ctx.fillText("Bhushan Zade - Manager", (image.width / 1.8), (image.height / 1.72));
    ctx.font = 'bold 50px Arial';
    ctx.fillText("ROC Care Systems", (image.width / 1.275), (image.height / 1.265));
    ctx.font = 'bold 50px Arial';
    ctx.fillText("07 June 2024", (image.width / 1.255), (image.height / 1.165));
    const buffer = canvas.toBuffer('image/jpeg');
    res.writeHead(200, {
      'Content-Type': `image/jpeg`,
      'Content-Length': buffer.length, // Set content length from buffer
    });

    res.end(buffer, 'binary');
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Image editing failed' });
  }

  // Jimp.read('images/bronze-base-certificate.jpg', (err, image) => {
  //   if (err) throw err;

  //   // Edit the image using Jimp methods (explained later)

  //   image.write('edited_image.jpg', (err) => {
  //     if (err) throw err;
  //     console.log('Image edited and saved successfully!');
  //   });
  // });

}