
const addFeatureBtn = document.getElementById('add-feature-btn');
const featuresContainer = document.getElementById('features-container');

addFeatureBtn.addEventListener('click', () => {
  // Create new feature input fields
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.name = 'features_title[]';
  titleInput.placeholder = 'Feature Title';
  titleInput.required = true;

  const imgInput = document.createElement('input');
  imgInput.type = 'text';
  imgInput.name = 'features_img[]';
  imgInput.placeholder = 'Feature Image URL';
  imgInput.required = true;

  const descInput = document.createElement('input');
  descInput.type = 'text';
  descInput.name = 'features[]';
  descInput.placeholder = 'Feature Description';
  descInput.required = true;

  // Append the new inputs to the container
  featuresContainer.appendChild(titleInput);
  featuresContainer.appendChild(imgInput);
  featuresContainer.appendChild(descInput);
});
