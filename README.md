In machine learning, a trained model can be represented in various forms, depending on the type of model and the framework used. For deep learning models, particularly those involving neural networks, the trained model is represented by its weights and biases, which are typically stored in matrices and tensors. Let's break down the representation for different types of models:

### 1. Linear Regression

For a simple linear regression model \( y = \beta_0 + \beta_1 x \), the model parameters (\(\beta_0\) and \(\beta_1\)) are scalars. In a multivariate linear regression, where \( y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \ldots + \beta_n x_n \), the weights can be represented as a vector:

\[
\mathbf{\beta} = \begin{bmatrix}
\beta_0 \\
\beta_1 \\
\beta_2 \\
\vdots \\
\beta_n
\end{bmatrix}
\]

### 2. Logistic Regression

For logistic regression, the weights for each feature and the bias term can also be represented as a vector, similar to linear regression.

### 3. Neural Networks

For neural networks, the trained model consists of multiple layers, each with its own set of weights and biases. Let's consider a simple feedforward neural network with one hidden layer:

- **Input layer**: Assume the input vector \(\mathbf{x}\) has \(n\) features.
- **Hidden layer**: Assume there are \(h\) hidden units.
- **Output layer**: Assume there is one output unit.

#### Weights and Biases

- **Input to Hidden Layer Weights**: Represented by a matrix \(\mathbf{W_1}\) of shape \(h \times n\).
- **Hidden Layer Biases**: Represented by a vector \(\mathbf{b_1}\) of shape \(h\).
- **Hidden to Output Layer Weights**: Represented by a matrix \(\mathbf{W_2}\) of shape \(1 \times h\).
- **Output Layer Bias**: Represented by a scalar \(\mathbf{b_2}\).

So, for a simple feedforward neural network, the trained model can be represented as:

\[
\mathbf{W_1} = \begin{bmatrix}
w_{11} & w_{12} & \ldots & w_{1n} \\
w_{21} & w_{22} & \ldots & w_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
w_{h1} & w_{h2} & \ldots & w_{hn}
\end{bmatrix}
\]

\[
\mathbf{b_1} = \begin{bmatrix}
b_{11} \\
b_{12} \\
\vdots \\
b_{1h}
\end{bmatrix}
\]

\[
\mathbf{W_2} = \begin{bmatrix}
w_{21} & w_{22} & \ldots & w_{2h}
\end{bmatrix}
\]

\[
\mathbf{b_2} = b_{21}
\]

### 4. Convolutional Neural Networks (CNNs)

In CNNs, the weights are organized into filters (kernels), which are used for convolution operations. Each filter has its own set of weights.

- **Convolutional Layer Weights**: Represented by a 4D tensor of shape \((\text{num\_filters}, \text{filter\_depth}, \text{filter\_height}, \text{filter\_width})\).
- **Biases**: Represented by a vector of shape \((\text{num\_filters})\).

### 5. Recurrent Neural Networks (RNNs)

In RNNs, the weights include input weights, recurrent weights, and biases:

- **Input Weights**: Represented by a matrix \(\mathbf{W}\) of shape \((\text{hidden\_units}, \text{input\_features})\).
- **Recurrent Weights**: Represented by a matrix \(\mathbf{U}\) of shape \((\text{hidden\_units}, \text{hidden\_units})\).
- **Biases**: Represented by a vector \(\mathbf{b}\) of shape \((\text{hidden\_units})\).

### 6. Transformer Models

Transformers use a combination of linear layers and attention mechanisms:

- **Attention Weights**: Represented by multiple matrices for query, key, and value projections.
- **Feedforward Weights**: Represented by matrices for the linear transformations in the feedforward network.

### Example: Fully Connected Neural Network (FCNN)

Consider a fully connected neural network with the following architecture:

- Input layer: 3 neurons
- Hidden layer 1: 4 neurons
- Hidden layer 2: 2 neurons
- Output layer: 1 neuron

#### Weights and Biases

1. **Input to Hidden Layer 1 Weights (\(\mathbf{W_1}\))**:
   \[
   \mathbf{W_1} = \begin{bmatrix}
   w_{11} & w_{12} & w_{13} \\
   w_{21} & w_{22} & w_{23} \\
   w_{31} & w_{32} & w_{33} \\
   w_{41} & w_{42} & w_{43}
   \end{bmatrix}
   \]
   Shape: \(4 \times 3\)

2. **Hidden Layer 1 Biases (\(\mathbf{b_1}\))**:
   \[
   \mathbf{b_1} = \begin{bmatrix}
   b_{11} \\
   b_{12} \\
   b_{13} \\
   b_{14}
   \end{bmatrix}
   \]
   Shape: \(4\)

3. **Hidden Layer 1 to Hidden Layer 2 Weights (\(\mathbf{W_2}\))**:
   \[
   \mathbf{W_2} = \begin{bmatrix}
   w_{11} & w_{12} & w_{13} & w_{14} \\
   w_{21} & w_{22} & w_{23} & w_{24}
   \end{bmatrix}
   \]
   Shape: \(2 \times 4\)

4. **Hidden Layer 2 Biases (\(\mathbf{b_2}\))**:
   \[
   \mathbf{b_2} = \begin{bmatrix}
   b_{21} \\
   b_{22}
   \end{bmatrix}
   \]
   Shape: \(2\)

5. **Hidden Layer 2 to Output Layer Weights (\(\mathbf{W_3}\))**:
   \[
   \mathbf{W_3} = \begin{bmatrix}
   w_{11} & w_{12}
   \end{bmatrix}
   \]
   Shape: \(1 \times 2\)

6. **Output Layer Bias (\(\mathbf{b_3}\))**:
   \[
   \mathbf{b_3} = b_{31}
   \]
   Shape: \(1\)

These weights and biases are adjusted during training to minimize the loss function. In practice, the trained model's weights and biases are saved to a file, which can be loaded later to make predictions or further fine-tune the model.

