import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Estilos mejorados para la tabla de productos

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    border: '1px solid #000',
    display: 'flex',
    flexDirection: 'column',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    borderBottom: '2px solid #000',
    padding: 5,
    fontWeight: 'bold',
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around',
    borderBottom: '1px solid #ccc',
    paddingVertical: 8,
    minHeight: 100,
    break: 'avoid', // Evita que se divida entre páginas
    wrap: false,
  },
  column: {
    fontSize: 12,
    paddingHorizontal: 1,
    textAlign: 'center',
    width:'25%'
  },
  image: {
    width: '25%',
    height: 130,
    borderRadius: 5,
    padding: 5,
  },
});


export default function PDF({ products = [] }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>INVENTARIO</Text>

        {products.length > 0 ? (
          <View style={styles.table}>
            {/* Encabezado de la tabla */}
            <View style={styles.tableHeader}>
              <Text style={styles.column}>Imagen</Text>
              <Text style={styles.column}>Nombre</Text>
              <Text style={styles.column}>talla</Text>
              <Text style={styles.column}>Unidades</Text>
            </View>

            {/* Filas de productos */}
            {products.map((product) => (
              <View key={product._id} style={styles.tableRow}>
                  {product.images[0] && product.images.length > 0 ? (
                    <Image src={product.images[0]} style={styles.image} />
                  ) : (
                    <Text>Sin imagen</Text>
                  )}
                <Text style={styles.column}>{product.productName || 'Sin nombre'}</Text>
                <Text style={styles.column}>{product.garment.size.size || 'Sin nombre'}</Text>
                <Text style={styles.column}>{product.availableUnits ?? 'N/A'}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text>No hay productos disponibles</Text>
        )}
      </Page>
    </Document>
  );
}
