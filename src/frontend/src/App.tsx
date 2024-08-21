import { useState } from 'react';

// Define the type for each Doa object
interface Doa {
  id: string;
  doa: string;
  ayat: string;
  latin: string;
  artinya: string;
}

function App() {
  // Specify that doaList is an array of Doa objects
  const [doaList, setDoaList] = useState<Doa[]>([]);

  function handleSubmit(event: any) {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_CANISTER_URL}/hello-world`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
     })
      .then(response => response.json())
      .then((json) => {
        setDoaList(json); // Set the whole list of doa objects
      });
  }

  return (
    <main style={styles.container}>
      <img src="/logo2.svg" alt="DFINITY logo" style={styles.logo} />
      <form action="#" onSubmit={handleSubmit} style={styles.form}>
        <button type="submit" style={styles.button}>Show Me!</button>
      </form>

      {doaList.length > 0 && (
        <section style={styles.listContainer}>
          {doaList.map((doaItem) => (
            <div key={doaItem.id} style={styles.card}>
              <h2 style={styles.doaTitle}>{doaItem.doa}</h2>
              <p><strong>Ayat:</strong> {doaItem.ayat}</p>
              <p><strong>Latin:</strong> {doaItem.latin}</p>
              <p><strong>Artinya:</strong> {doaItem.artinya}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center' as const,
  },
  logo: {
    marginBottom: '20px',
    width: '150px',
  },
  form: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  listContainer: {
    marginTop: '20px',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'left' as const,
  },
  doaTitle: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#333',
  },
};

export default App;
