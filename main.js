import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { 
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDies7HBA_N8xfk_8DJlM-EFbi_GTXDJpI",
  authDomain: "insan-cemerlang-996a1.firebaseapp.com",
  projectId: "insan-cemerlang-996a1",
  storageBucket: "insan-cemerlang-996a1.appspot.com",
  messagingSenderId: "137591161633",
  appId: "1:137591161633:web:e89f54d3cf2a29d9fdb460",
  measurementId: "G-B5KFGBXLMV"
};

// Inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function ambilDaftarSiswa() {
  const refDokumen = collection(basisdata, "siswa");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikankueri = await getDocs(kueri);
  
  let hasilkueri = [];
  cuplikankueri.forEach((dokumen) => {
    hasilkueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      alamat: dokumen.data().alamat
    })
  })
  
  return hasilkueri;
}

export async function tambahSiswa(nama, alamat) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "siswa"), {
      nama: nama,
      alamat: alamat
    })
    
    // menampilkan pesan berhasil
    console.log("berhasil menyimpan data siswa")
  } catch (error) {
  // menampilkan pesan gagal
  console.console.log("gagal menyimpan data siswa")
  }
}

export async function hapusSiswa(id) {
  await deleteDoc(doc(basisdata, "siswa", id))
}