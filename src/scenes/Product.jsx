
import React, { useState, useEffect } from 'react';
import { Box, Heading, Input, Flex, Button, List, ListItem, FormControl, FormLabel, useToast } from '@chakra-ui/react';

const Product = () => {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [saleQuantity, setSaleQuantity] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = () => {
    if (productName && productQuantity) {
      const newProduct = {
        name: productName,
        quantity: parseInt(productQuantity)
      };
      setProducts([...products, newProduct]);
      setProductName('');
      setProductQuantity('');
      setMessage('');
    } else {
      setMessage('Please enter product name and quantity.');
    }
  };

  const handleSale = (index) => {
    if (saleQuantity && parseInt(saleQuantity) <= products[index].quantity) {
      const updatedProducts = [...products];
      updatedProducts[index].quantity -= parseInt(saleQuantity);
      setProducts(updatedProducts);
      setSaleQuantity('');
      setMessage('');
    } else {
      setMessage('Invalid sale quantity or insufficient stock.');
    }
  };

  const deleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    toast({
      title: "Product Deleted",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p="4">
      <Heading as="h1" bgColor={"blue"} color={"white"} size="xl">Arslan Traders & Co</Heading>
      <Flex justifyContent={"center"} gap={"6%"}>
        
      <Box mt="4">
      <Heading>Add The New Products For Stock</Heading>
        <FormControl>
          <FormLabel fontSize={"16"} fontWeight={"bold"}>Product Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </FormControl>
        <FormControl mt="12">
          <FormLabel fontSize={"16"} fontWeight={"bold"}>Product Quantity</FormLabel>
          <Input
            type="number"
            placeholder="Enter product quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
        </FormControl>
        <Button bgColor={"blue"} cursor={"pointer"} color={"white"} pt={"6"} pr={"12"} pb={"6"} pl={"12"} fontSize={"16px"} borderRadius={"5"} fontWeight={"bold"} mt="6" onClick={addProduct}>Add Product</Button>
      </Box>
      <Box mt="4">
        <Heading as="h2" size="md"> MY STOCK</Heading>
        <List mt="2">
          {products.map((product, index) => (
            <ListItem key={index}>
              {product.name} - Quantity: {product.quantity}
              <FormControl mt="2">
                <FormLabel>Sale Quantity</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter sale quantity"
                  value={saleQuantity}
                  onChange={(e) => setSaleQuantity(e.target.value)}
                />
              </FormControl>
              <Button bgColor={"blue"} color={"white"} pt={"6"} pr={"12"} pb={"6"} pl={"12"} fontSize={"16px"} cursor={"pointer"} borderRadius={"5"} fontWeight={"bold"} mt="6" onClick={() => handleSale(index)}>Sell</Button>
              <Button bgColor={"red"} color={"white"} pt={"6"} pr={"12"} pb={"6"} pl={"12"} fontSize={"16px"} cursor={"pointer"} borderRadius={"5"} fontWeight={"bold"} mt="6" onClick={() => deleteProduct(index)}>Delete</Button>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box mt="2">{message}</Box>
      </Flex>
    </Box>
  );
};

export default Product;







