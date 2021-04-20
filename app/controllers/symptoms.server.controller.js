const tf = require("@tensorflow/tfjs");
const dataset = require("../machinelearning/dataset/heart.json");

exports.userDataPredict = function (req, res) {
  const userData = [
    {
      age: req.body.age === true ? 1 : 0,
      cp: req.body.cp === true ? 1 : 0,
      sex: req.body.sex === true ? 1 : 0,
      trestbps: parseInt(req.body.trestbps),
      chol: parseInt(req.body.chol),
      thalach: parseInt(req.body.thalach),
      fbs: req.body.fbs === true ? 1 : 0,
      exang: req.body.exang === true ? 1 : 0, 
    }];
  console.log(userData);

  const trainingData = tf.tensor2d(dataset.map(item => [
    item.age > 50 ? 1 : 0,
    item.cp > 0 ? 1 : 0,
    item.sex,
    item.trestbps,
    item.chol,
    item.thalach,
    item.fbs,
    item.exang,
  ]));

  
  const outputData = tf.tensor2d(dataset.map(item => [
    item.target
  ]));

  const testingData = tf.tensor2d(userData.map(item => [
    item.age,
    item.cp,
    item.sex,
    item.trestbps,
    item.chol,
    item.thalach,
    item.fbs,
    item.exang,
  ]));

  console.log(testingData);

  console.log(testingData.dataSync());
  testingData.array().then(array => {
    console.log(array)
  })

  const model = tf.sequential();
  model.add(
    tf.layers.dense({
      inputShape: [8],
      activation: "sigmoid", //binary classification
      units: 10, // trial and error for desired hidden layer
    })
  );
  model.add(
    tf.layers.dense({
      inputShape: [10],
      activation: "sigmoid",
      units: 1,
    })
  );
  model.add(
    tf.layers.dense({
      activation: "sigmoid",
      units: 1,
    })
  );
  model.compile({
    loss: "binaryCrossentropy",
    optimizer: "adam",
    metrics: ["accuracy"],
  });

  async function run() {
    await model.fit(trainingData, outputData,
      {
        epochs: 1000,
        callbacks: {
          onEpochEnd: (epoch, log) => {
            console.log(`Epoch ${epoch}: loss = ${log.loss}`);
          }
        }
      }
    )
    const results = model.predict(testingData);
    results.print()
    results.array().then((array) => {
      console.log(array);
      let result = resultInterpretation(array[0][0]);
      console.log(result);
      res.status(200).json(result);
    });
  }

  run();

}

function resultInterpretation(prediction) {
  let probability = (Math.round((prediction + Number.EPSILON) * 100) / 100) * 100;

  if (probability < 45) {
    return {
      possibility: probability+ "%",
      message: "Your heart is fine, you don't need to visit a doctor"
    };
  } else if (probability < 66) {
    return {
      possibility: probability+ "%",
      message: "You might have a heart disease, please consult your doctor"
    };
  } else {
    return {
      possibility: probability+ "%",
      message: "Your heart situation is critical, Please go to the hospital immediately"
    };
  }
}