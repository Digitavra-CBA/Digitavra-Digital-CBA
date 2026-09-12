//ini rubric js
//  Rubrik Penilaian — Job Performance Table Set-Up Restaurant
// Sumber: SOP No. 002/F&B/PnP Food and Beverage Service
// 20 indikator, skor 1-4, skor maksimal = 80

export const RUBRIC = [
  {
    category: "Hard Skill",
    key: "hard",
    indicators: [
      {
        id: "h1",
        name: "Kelengkapan Peralatan Kerja Awal",
        descriptors: {
          4: "Seluruh perlengkapan, bahan, dan dokumen kerja tersedia lengkap, sesuai kebutuhan tugas, dalam kondisi siap digunakan, dan telah diperiksa sebelum bekerja.",
          3: "Hampir seluruh perlengkapan tersedia dan siap digunakan, namun terdapat sedikit kekurangan yang tidak menghambat pelaksanaan pekerjaan.",
          2: "Beberapa perlengkapan belum tersedia atau belum siap digunakan sehingga memerlukan pengambilan, penggantian, atau arahan sebelum pekerjaan dapat dilaksanakan.",
          1: "Banyak perlengkapan tidak tersedia atau tidak siap digunakan sehingga menghambat pelaksanaan pekerjaan.",
        },
      },
      {
        id: "h2",
        name: "Penerapan Keselamatan & Kesehatan Kerja (K3)",
        descriptors: {
          4: "Menerapkan prosedur K3 secara konsisten.",
          3: "Menerapkan prosedur K3, namun terdapat 1 aspek yang terlewat.",
          2: "Penerapan K3 kurang konsisten (2 aspek terlewat).",
          1: "Tidak menerapkan prosedur K3 selama bekerja.",
        },
      },
      {
        id: "h3",
        name: "Menguasai Bahasa Indonesia dengan Baik",
        descriptors: {
          4: "Mampu menggunakan Bahasa Indonesia dengan jelas, tepat, dan sopan, baik secara lisan maupun tulisan, serta mampu menyesuaikan bahasa dengan situasi kerja.",
          3: "Mampu menggunakan Bahasa Indonesia dengan jelas dan sopan dalam komunikasi kerja, dengan sedikit kesalahan penggunaan kata atau tata bahasa.",
          2: "Mampu berkomunikasi menggunakan Bahasa Indonesia, tetapi masih terdapat beberapa kesalahan dalam penggunaan kata, tata bahasa, atau penyampaian sehingga terkadang memerlukan klarifikasi.",
          1: "Kurang mampu menggunakan Bahasa Indonesia dengan baik sehingga komunikasi sering tidak jelas, terdapat banyak kesalahan, dan memerlukan bantuan atau pengulangan.",
        },
      },
      {
        id: "h4",
        name: "Grooming",
        descriptors: {
          4: "Selalu berpenampilan bersih, rapi, lengkap, dan sesuai dengan standar grooming yang ditetapkan industri.",
          3: "Berpenampilan bersih dan rapi serta sesuai standar grooming, namun terdapat sedikit kekurangan yang tidak mengganggu penampilan kerja.",
          2: "Penampilan cukup rapi, tetapi terdapat beberapa aspek grooming yang belum sesuai standar dan masih memerlukan pengingat.",
          1: "Penampilan kurang bersih dan rapi serta tidak memenuhi standar grooming meskipun telah diberikan arahan.",
        },
      },
      {
        id: "h5",
        name: "Product Knowledge",
        descriptors: {
          4: "Menguasai informasi hotel secara lengkap, mampu menjelaskan karakteristik, fungsi, dan keunggulannya dengan tepat serta dapat memberikan informasi sesuai kebutuhan tamu.",
          3: "Menguasai sebagian besar informasi hotel dan mampu menjelaskannya dengan tepat, dengan sedikit kekurangan informasi.",
          2: "Mengetahui informasi dasar hotel, tetapi masih terdapat beberapa kekeliruan dan memerlukan arahan atau bantuan dalam memberikan informasi kepada tamu.",
          1: "Kurang memahami informasi hotel sehingga tidak mampu memberikan penjelasan yang tepat dan memerlukan pendampingan.",
        },
      },
    ],
  },
  {
    category: "Soft Skill",
    key: "soft",
    indicators: [
      {
        id: "s1",
        name: "Greeting",
        descriptors: {
          4: "Menyambut tamu dengan hangat dan tulus, mengucapkan salam standar, serta menawarkan bantuan.",
          3: "Menyambut tamu sesuai standar, namun sikap kurang hangat/natural.",
          2: "Ada elemen standar menyambut tamu yang terlewat.",
          1: "Menyambut tamu tidak sesuai standar.",
        },
      },
      {
        id: "s2",
        name: "Sikap dan Etika Kerja",
        descriptors: {
          4: "Selalu menunjukkan sikap sopan, ramah, profesional, disiplin, bertanggung jawab, dan menghargai tamu maupun rekan kerja.",
          3: "Menunjukkan sikap dan etika kerja yang baik, namun sesekali masih memerlukan pengingat.",
          2: "Sikap dan etika kerja cukup, tetapi belum konsisten dan masih memerlukan arahan dari supervisor.",
          1: "Menunjukkan sikap dan etika kerja yang kurang, seperti tidak disiplin, kurang sopan, atau kurang bertanggung jawab.",
        },
      },
      {
        id: "s3",
        name: "Problem Solving",
        descriptors: {
          4: "Mampu mengidentifikasi masalah, menentukan solusi yang tepat, dan menyelesaikannya secara mandiri dengan cepat dan efektif.",
          3: "Mampu mengidentifikasi dan menyelesaikan masalah dengan tepat, namun masih memerlukan sedikit arahan.",
          2: "Mampu mengenali masalah tetapi masih kesulitan menentukan solusi dan membutuhkan cukup banyak arahan.",
          1: "Kesulitan mengenali maupun menyelesaikan masalah dan selalu membutuhkan bantuan atau arahan dari supervisor.",
        },
      },
      {
        id: "s4",
        name: "Inisiatif dan Adaptasi",
        descriptors: {
          4: "Aktif mengambil inisiatif, mampu menyesuaikan diri dengan cepat terhadap tugas dan situasi kerja, serta dapat bekerja tanpa selalu menunggu arahan.",
          3: "Mampu menyesuaikan diri dengan lingkungan dan tugas kerja serta cukup aktif mengambil inisiatif dengan sedikit arahan.",
          2: "Mampu beradaptasi tetapi membutuhkan waktu dan arahan serta inisiatif dalam bekerja masih terbatas.",
          1: "Kesulitan beradaptasi terhadap tugas atau situasi kerja dan cenderung pasif serta selalu menunggu arahan.",
        },
      },
      {
        id: "s5",
        name: "Green Awareness",
        descriptors: {
          4: "Memahami dan secara konsisten menerapkan prinsip ramah lingkungan dalam pekerjaan, seperti menghemat energi dan air, mengurangi limbah, serta menggunakan bahan secara bijak.",
          3: "Memahami dan menerapkan sebagian besar prinsip ramah lingkungan dalam pekerjaan dengan sedikit pengingat.",
          2: "Mengetahui prinsip dasar ramah lingkungan tetapi penerapannya belum konsisten dan masih memerlukan arahan.",
          1: "Kurang memahami dan tidak menerapkan prinsip ramah lingkungan dalam pekerjaan meskipun telah diberikan arahan.",
        },
      },
      {
        id: "s6",
        name: "Teamwork",
        descriptors: {
          4: "Selalu bekerja sama secara aktif, berkomunikasi dengan baik, membantu rekan kerja, dan mampu berkoordinasi secara efektif dalam menyelesaikan pekerjaan.",
          3: "Mampu bekerja sama dan berkoordinasi dengan baik serta bersedia membantu rekan kerja ketika diperlukan.",
          2: "Mampu bekerja dalam tim tetapi komunikasi dan koordinasi masih perlu ditingkatkan serta memerlukan arahan.",
          1: "Kurang mampu bekerja sama, sulit berkoordinasi dan cenderung bekerja sendiri tanpa memperhatikan kebutuhan tim.",
        },
      },
      {
        id: "s7",
        name: "Ketelitian, Ketepatan, dan Kesungguhan dalam Bekerja",
        descriptors: {
          4: "Sangat teliti, fokus, dan sungguh-sungguh dalam bekerja, mengikuti prosedur dengan tepat, serta selalu menyelesaikan pekerjaan tepat waktu.",
          3: "Cukup teliti dan fokus, mengikuti prosedur kerja dengan baik, menunjukkan kesungguhan, dan umumnya menyelesaikan pekerjaan tepat waktu.",
          2: "Kurang teliti dan konsentrasi belum konsisten, masih terdapat beberapa kesalahan dalam mengikuti prosedur, serta terkadang terlambat menyelesaikan pekerjaan.",
          1: "Tidak teliti dan sering melakukan kesalahan, kurang berkonsentrasi dan bersungguh-sungguh, tidak mengikuti prosedur dengan baik, serta sering terlambat menyelesaikan pekerjaan.",
        },
      },
    ],
  },
  {
    category: "Technical Skill",
    key: "technical",
    indicators: [
      {
        id: "t1",
        name: "Melaksanakan Napkin Service",
        descriptors: {
          4: "Melaksanakan seluruh tahapan napkin service secara tepat, sistematis, lembut, hati-hati, dan mandiri sesuai SOP tanpa kesalahan.",
          3: "Melaksanakan sebagian besar tahapan napkin service dengan tepat tetapi terdapat kesalahan kecil yang tidak memengaruhi hasil pelayanan.",
          2: "Melaksanakan sebagian tahapan napkin service dengan benar, tetapi masih terdapat beberapa kesalahan dan memerlukan arahan.",
          1: "Belum mampu melaksanakan tahapan napkin service sesuai SOP dan memerlukan bimbingan secara intensif.",
        },
      },
      {
        id: "t2",
        name: "Melaksanakan Water Service",
        descriptors: {
          4: "Memastikan pitcher bersih, mengkilap, terpolish, bebas bercak, serta menuangkan air dari sisi kanan tamu dengan tepat dan menggunakan serbet untuk mencegah tetesan air.",
          3: "Melaksanakan water service dengan baik sesuai prosedur, tetapi terdapat kekurangan kecil dalam pemeriksaan pitcher atau teknik pelayanan.",
          2: "Mampu melakukan water service, tetapi masih terdapat beberapa kesalahan dalam persiapan atau pelaksanaan dan memerlukan arahan.",
          1: "Tidak mampu melaksanakan water service sesuai prosedur dan melakukan kesalahan mendasar dalam persiapan maupun pelayanan.",
        },
      },
      {
        id: "t3",
        name: "Melaksanakan Beverage Service",
        descriptors: {
          4: "Melakukan seluruh prosedur beverage service dengan benar, pengecekan pesanan sebelum meninggalkan counter, membawa tray secara horizontal dengan aman, dan urutan pelayanan tepat.",
          3: "Melaksanakan sebagian besar prosedur beverage service dengan benar, tetapi terdapat kesalahan kecil dalam pengecekan, membawa tray, atau urutan pelayanan.",
          2: "Melaksanakan beverage service tetapi masih terdapat beberapa kesalahan dan memerlukan arahan dalam penggunaan tray atau pengecekan pesanan.",
          1: "Belum mampu melaksanakan beverage service sesuai prosedur dan memerlukan bimbingan intensif.",
        },
      },
      {
        id: "t4",
        name: "Menyiapkan dan Menempatkan Additional Cutleries",
        descriptors: {
          4: "Menyiapkan dan menempatkan cutlery sesuai kebutuhan dan standar secara tepat, rapi, bersih, polished, serta menggunakan tray selama proses penambahan cutlery.",
          3: "Menyiapkan dan menempatkan sebagian besar cutlery dengan benar sesuai standar, tetapi masih terdapat kesalahan kecil.",
          2: "Mampu menyiapkan dan menempatkan cutlery, tetapi masih terdapat beberapa kesalahan posisi, kelengkapan, kebersihan, atau penggunaan tray.",
          1: "Tidak mampu menyiapkan dan menempatkan cutlery sesuai standar serta memerlukan bimbingan intensif.",
        },
      },
      {
        id: "t5",
        name: "Melaksanakan Crumbing Down",
        descriptors: {
          4: "Melaksanakan seluruh tahapan crumbing down secara sistematis menggunakan service napkin dan dessert plate, tanpa menjatuhkan kotoran/remah ke lantai.",
          3: "Melaksanakan sebagian besar tahapan crumbing down dengan benar, tetapi terdapat kesalahan kecil yang tidak mengganggu hasil pekerjaan.",
          2: "Mampu melakukan crumbing down, tetapi masih terdapat beberapa kesalahan teknik dan memerlukan arahan.",
          1: "Belum mampu melakukan crumbing down sesuai prosedur dan memerlukan bimbingan secara intensif.",
        },
      },
      {
        id: "t6",
        name: "Melakukan Clear Up Peralatan Setelah Tamu Selesai Makan",
        descriptors: {
          4: "Melakukan clear up seluruh piring, cutlery, equipment, dan perlengkapan hidangan secara lengkap, tepat, dan sesuai prosedur.",
          3: "Melakukan clear up sebagian besar peralatan dengan benar, tetapi masih terdapat kekurangan kecil.",
          2: "Melakukan clear up sebagian peralatan, tetapi masih terdapat beberapa kesalahan atau perlengkapan yang tertinggal.",
          1: "Tidak mampu melakukan clear up sesuai prosedur dan memerlukan bimbingan intensif.",
        },
      },
      {
        id: "t7",
        name: "Melaksanakan Table Cleaning",
        descriptors: {
          4: "Membersihkan meja secara menyeluruh setelah pelayanan sehingga meja kembali bersih dan siap digunakan.",
          3: "Melaksanakan table cleaning dengan baik dan meja kembali bersih, tetapi masih terdapat kekurangan kecil dalam proses pembersihan.",
          2: "Melakukan table cleaning tetapi masih terdapat bagian meja atau perlengkapan yang belum dibersihkan secara optimal.",
          1: "Tidak mampu melakukan table cleaning dengan benar sehingga meja belum memenuhi standar kebersihan.",
        },
      },
      {
        id: "t8",
        name: "Menangani Seluruh Equipment Setelah Clear Up",
        descriptors: {
          4: "Memisahkan dan menempatkan seluruh peralatan sesuai jenisnya dengan benar, termasuk gelas pada rak, sendok/garpu pada panci perendaman, sisa makanan pada tempat pembuangan, dan piring ditumpuk untuk dicuci.",
          3: "Memisahkan dan menempatkan sebagian besar peralatan dengan benar, tetapi terdapat kesalahan kecil dalam penempatan.",
          2: "Mampu menangani peralatan setelah clear up, tetapi masih terdapat beberapa kesalahan pemisahan atau penempatan.",
          1: "Tidak mampu menangani dan memisahkan peralatan sesuai prosedur serta memerlukan bimbingan intensif.",
        },
      },
    ],
  },
];

export const ALL_INDICATORS = RUBRIC.flatMap((c) =>
  c.indicators.map((i) => ({ ...i, category: c.category, categoryKey: c.key }))
);

export const MAX_SCORE = ALL_INDICATORS.length * 4; // 80

export function emptyScores() {
  return Object.fromEntries(ALL_INDICATORS.map((i) => [i.id, 0]));
}
