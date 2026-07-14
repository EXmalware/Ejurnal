document.addEventListener('DOMContentLoaded', () => {
    // Splash screen randomized video background
    const splashVideo = document.getElementById('splash-video');
    if (splashVideo) {
        // Array of school-related video URLs (using high-quality free placeholders)
        // User can replace these with direct MP4 links from Pixabay or other sources
        const splashVideos = [
            "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            "https://cdn.pixabay.com/video/2021/09/19/89066-613200185.mp4",
            "https://cdn.pixabay.com/video/2023/01/10/146061-788094901.mp4"
        ];
        // Select a random video
        const randomVideo = splashVideos[Math.floor(Math.random() * splashVideos.length)];
        splashVideo.src = randomVideo;
    }

    

    // --- UPDATE ACADEMIC YEAR ---
    function updateAcademicYear() {
        const badge = document.getElementById('academic-year-badge');
        if (!badge) return;
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth(); // 0-based, July is 6
        let academicYearText = '';
        if (month >= 6) {
            academicYearText = `TA ${year}/${year + 1}`;
        } else {
            academicYearText = `TA ${year - 1}/${year}`;
        }
        badge.innerText = academicYearText;
    }
    updateAcademicYear();

    const splashScreen = document.getElementById('splash-screen');
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const avatarBtn = document.getElementById('avatar-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    const studentsScreen = document.getElementById('students-screen');
    const menuSiswa = document.getElementById('menu-siswa');
    const backFromStudents = document.getElementById('back-from-students');
    const classListContainer = document.getElementById('class-list-container');
    const searchClassInput = document.getElementById('search-class');
    const studentDetailScreen = document.getElementById('student-detail-screen');
    const studentListContainer = document.getElementById('student-list-container');
    const detailClassName = document.getElementById('detail-class-name');
    const backFromDetail = document.getElementById('back-from-detail');
    const menuRekap = document.getElementById('menu-rekap');
    const rekapScreen = document.getElementById('rekap-screen');
    const rekapListContainer = document.getElementById('rekap-list-container');
    const backFromRekap = document.getElementById('back-from-rekap');

    const menuEkspor = document.getElementById('menu-ekspor');
    const eksporScreen = document.getElementById('ekspor-screen');
    const backFromEkspor = document.getElementById('back-from-ekspor');
    const btnGeneratePdf = document.getElementById('btn-generate-pdf');
    const filterBulan = document.getElementById('ekspor-filter-bulan');
    const filterTahun = document.getElementById('ekspor-filter-tahun');
    const btnTerapkanFilter = document.getElementById('btn-terapkan-filter-ekspor');
    const eksporPreviewContainer = document.getElementById('ekspor-preview-container');

    const menuRekapKelas = document.getElementById('menu-rekap-kelas');
    const rekapKelasScreen = document.getElementById('rekap-kelas-screen');
    const rekapKelasContainer = document.getElementById('rekap-kelas-container');
    const backFromRekapKelas = document.getElementById('back-from-rekap-kelas');

    const menuLaporanKehadiran = document.getElementById('menu-laporan-kehadiran');
    const laporanKehadiranScreen = document.getElementById('laporan-kehadiran-screen');
    const backFromLaporanKehadiran = document.getElementById('back-from-laporan-kehadiran');
    const filterLaporanKelas = document.getElementById('filter-laporan-kelas');
    const filterLaporanBulan = document.getElementById('filter-laporan-bulan');
    const filterLaporanTahun = document.getElementById('filter-laporan-tahun');
    const btnTerapkanLaporan = document.getElementById('btn-terapkan-laporan');
    const laporanKehadiranResult = document.getElementById('laporan-kehadiran-result');
    const laporanKehadiranTbody = document.getElementById('laporan-kehadiran-tbody');
    const btnUnduhLaporanPdf = document.getElementById('btn-unduh-laporan-pdf');
    const semesterRecapContainer = document.getElementById('semester-recap-container');
    const btnSmtGanjil = document.getElementById('btn-smt-ganjil');
    const btnSmtGenap = document.getElementById('btn-smt-genap');

    // Rekap Guru Mapel Elements
    const menuRekapGuruMapel = document.getElementById('menu-rekap-guru-mapel');
    const rekapGuruMapelScreen = document.getElementById('rekap-guru-mapel-screen');
    const backFromRekapGuruMapel = document.getElementById('back-from-rekap-guru-mapel');
    const filterMapelKelas = document.getElementById('filter-mapel-kelas');
    const filterMapelMapel = document.getElementById('filter-mapel-mapel');
    const filterMapelBulan = document.getElementById('filter-mapel-bulan');
    const filterMapelTahun = document.getElementById('filter-mapel-tahun');
    const btnTerapkanMapel = document.getElementById('btn-terapkan-mapel');
    const rekapMapelResult = document.getElementById('rekap-mapel-result');
    const rekapMapelTbody = document.getElementById('rekap-mapel-tbody');
    const btnUnduhRekapMapelPdf = document.getElementById('btn-unduh-rekap-mapel-pdf');

    // Evaluasi Kehadiran Elements
    const menuEvaluasiKehadiran = document.getElementById('menu-evaluasi-kehadiran');
    const evaluasiKehadiranScreen = document.getElementById('evaluasi-kehadiran-screen');
    const backFromEvaluasiKehadiran = document.getElementById('back-from-evaluasi-kehadiran');
    const filterEvalKelas = document.getElementById('filter-eval-kelas');
    const filterEvalTanggal = document.getElementById('filter-eval-tanggal');
    const btnTerapkanEval = document.getElementById('btn-terapkan-eval');
    const evaluasiKehadiranResult = document.getElementById('evaluasi-kehadiran-result');
    const evaluasiKehadiranTbody = document.getElementById('evaluasi-kehadiran-tbody');
    const evalHeaderRow = document.getElementById('eval-header-row');
    const evalSummary = document.getElementById('eval-summary');
    const btnUnduhEvalPdf = document.getElementById('btn-unduh-eval-pdf');

    let lastEvaluasiRows = []; // stored rows for PDF export

    // PDF export for Evaluasi Kehadiran (handler + generator)
    if (btnUnduhEvalPdf) {
        btnUnduhEvalPdf.addEventListener('click', async () => {
            if (!lastEvaluasiRows || lastEvaluasiRows.length === 0) {
                showToast('Belum ada data evaluasi. Terapkan filter terlebih dahulu.', 'warning');
                return;
            }
            try {
                await generateEvaluasiKehadiranPDF(filterEvalTanggal.value, filterEvalKelas.value, lastEvaluasiRows);
            } catch (e) {
                console.error(e);
                showToast('Gagal membuat PDF: ' + (e.message || e), 'error');
            }
        });
    }

    async function generateEvaluasiKehadiranPDF(tanggal, kelas, rows) {
        if (!window.jspdf) throw new Error('jsPDF tidak tersedia');
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4'); // Portrait
        const margin = 10;
        const pageWidth = doc.internal.pageSize.getWidth();

        // Calculate Academic Year automatically
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        const academicYear = currentMonth >= 6 ? `${currentYear}/${currentYear + 1}` : `${currentYear - 1}/${currentYear}`;

        // Get Wali Kelas Name & Guru BK Name
        const bkData = JSON.parse(localStorage.getItem('cached_bk') || '[]');
        const bkForClass = bkData.find(b => String(b.KELAS || b.Kelas || b.kelas || '').trim() === String(kelas).trim());
        let waliKelasName = '...........................................';
        let guruBkName = '...........................................';

        if (bkForClass) {
            if (bkForClass.WALIKELAS || bkForClass.WaliKelas || bkForClass.walikelas) {
                waliKelasName = bkForClass.WALIKELAS || bkForClass.WaliKelas || bkForClass.walikelas;
            }
            if (bkForClass.NAMA_GURU_BK || bkForClass.GURU_BK || bkForClass.GURUBK || bkForClass.Nama_Guru_BK) {
                guruBkName = bkForClass.NAMA_GURU_BK || bkForClass.GURU_BK || bkForClass.GURUBK || bkForClass.Nama_Guru_BK;
            }
        }

        // Resolve NIPs dynamically from usersData by name
        const getTeacherNip = (teacherName) => {
            if (!teacherName || teacherName.includes('...')) return '...........................................';
            const found = usersData.find(u => {
                const dbName = String(u.NAMA || u.Nama || u.nama || '').trim().toLowerCase();
                return dbName === teacherName.trim().toLowerCase();
            });
            return found ? (found.NIP || found.Nip || found.nip || '...........................................') : '...........................................';
        };

        let waliKelasNip = '...........................................';
        let guruBkNip = '...........................................';

        if (bkForClass) {
            const sheetWaliNip = bkForClass.NIP_WALIKELAS || bkForClass.NIP_WaliKelas || bkForClass.Nip_WaliKelas || bkForClass.NIP_Wali_Kelas;
            const sheetBkNip = bkForClass.NIP_GURU_BK || bkForClass.NIP_Guru_BK || bkForClass.Nip_Guru_BK || bkForClass.NIP_BK;
            waliKelasNip = sheetWaliNip || getTeacherNip(waliKelasName);
            guruBkNip = sheetBkNip || getTeacherNip(guruBkName);
        } else {
            waliKelasNip = getTeacherNip(waliKelasName);
            guruBkNip = getTeacherNip(guruBkName);
        }

        // Get Wakil Kepala Sekolah Bidang Kurikulum
        const dokData = JSON.parse(localStorage.getItem('cached_dok') || '[]');
        const getDokData = (keyword) => {
            const found = dokData.find(d => {
                const kat = String(d.KATEGORI || d.Kategori || d.kategori || '').toUpperCase();
                return kat.includes(keyword.toUpperCase());
            });
            return found || { NAMA: '...........................................', Nama: '...........................................', NIP: '...........................................' };
        };
        const wakakurData = getDokData('WAKIL KEPALA SEKOLAH') || getDokData('KURIKULUM');
        const wakakurName = wakakurData.NAMA || wakakurData.Nama || wakakurData.nama || '...........................................';
        const wakakurNip = wakakurData.NIP || wakakurData.Nip || wakakurData.nip || '...........................................';

        // Header / Kop Laporan
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('EVALUASI KEHADIRAN HARIAN', pageWidth / 2, 15, { align: 'center' });
        doc.setFontSize(12);
        doc.text('SMK NEGERI 1 BUMIJAWA', pageWidth / 2, 20, { align: 'center' });

        doc.setFontSize(10);
        doc.text(`Tahun Pelajaran : ${academicYear}`, pageWidth / 2, 25, { align: 'center' });

        // Helper to format Date to "Hari, DD MMMM YYYY" in Indonesian
        const formatIndoDate = (dateStr) => {
            if (!dateStr) return '...........................';
            const parts = dateStr.split('-');
            if (parts.length !== 3) return dateStr;
            const dateObj = new Date(dateStr);
            const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            const dayName = days[dateObj.getDay()];
            
            const day = parseInt(parts[2], 10);
            const monthIdx = parseInt(parts[1], 10) - 1;
            const year = parts[0];
            const months = [
                'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
            ];
            return `${dayName}, ${day} ${months[monthIdx] || ''} ${year}`;
        };

        doc.setFont('helvetica', 'normal');
        doc.text(`Kelas : ${kelas || '..................'}`, margin, 34);
        doc.text(`Hari/Tanggal : ${formatIndoDate(tanggal)}`, margin, 39);
        doc.text(`Wali Kelas : ${waliKelasName}`, pageWidth - margin, 34, { align: 'right' });

        // Determine active jam numbers for that day/class to map absolute columns
        const combined = [...jurnalData, ...JSON.parse(localStorage.getItem('cached_jurnals') || '[]')];
        const dayJournals = combined.filter(j => j.TANGGAL === tanggal && j.KELAS === kelas);
        const jamSet = new Set();
        dayJournals.forEach(j => {
            const jamRaw = (j.JAM_KE || j.JAM || '').toString();
            jamRaw.split(',').map(s => s.trim()).forEach(jamStr => {
                const jamNum = parseInt(jamStr, 10);
                if (!isNaN(jamNum)) {
                    jamSet.add(jamNum);
                }
            });
        });
        const activeJams = Array.from(jamSet).sort((a, b) => a - b);

        // Sort journals by Jam starting time to fill mapel blocks
        const sortedJournals = [...dayJournals].sort((a, b) => {
            const jamA = parseInt((a.JAM_KE || a.JAM || '').toString().split(',')[0], 10) || 0;
            const jamB = parseInt((b.JAM_KE || b.JAM || '').toString().split(',')[0], 10) || 0;
            return jamA - jamB;
        });

        // Use actual student rows (do not pad to 36)
        const displayRows = (rows || []).filter(r => (r.name || r.NAMA_PESERTA_DIDIK || r.NAMA || '').trim() !== '');
        const totalRows = displayRows.length;

        const head = [
            [
                { content: 'NO', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' } },
                { content: 'NAMA MURID', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' } },
                { content: 'JAM PELAJARAN', colSpan: 11, styles: { halign: 'center', fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' } },
                { content: 'INFORMASI MATA PELAJARAN', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' } }
            ],
            [
                { content: '1', styles: { halign: 'center', fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' } },
                { content: '2', styles: { halign: 'center', fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' } },
                { content: '3', styles: { halign: 'center', fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' } },
                { content: '4', styles: { halign: 'center', fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' } },
                { content: '5', styles: { halign: 'center', fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' } },
                { content: '6', styles: { halign: 'center', fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' } },
                { content: '7', styles: { halign: 'center', fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' } },
                { content: '8', styles: { halign: 'center', fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' } },
                { content: '9', styles: { halign: 'center', fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' } },
                { content: '10', styles: { halign: 'center', fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' } },
                { content: '11', styles: { halign: 'center', fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' } }
            ]
        ];

        const body = [];
        for (let i = 0; i < totalRows; i++) {
            const r = displayRows[i];
            const rowNo = i + 1;
            const name = r.name || r.NAMA_PESERTA_DIDIK || r.NAMA || '';
            
            const rowData = [rowNo, name];
            
            // Populate attendance for absolute jams 1 to 11
            const statuses = r.statuses || [];
            for (let jamVal = 1; jamVal <= 11; jamVal++) {
                const idx = activeJams.indexOf(jamVal);
                if (idx >= 0) {
                    rowData.push(statuses[idx] || 'H');
                } else {
                    rowData.push('');
                }
            }

            if (i % 6 === 0) {
                const blockIdx = Math.floor(i / 6);
                let mapel = '';
                let guru = '';
                let jam = '';
                let materi = '';
                
                if (sortedJournals[blockIdx]) {
                    const jInfo = sortedJournals[blockIdx];
                    mapel = jInfo.MAPEL || '';
                    guru = jInfo.NAMA_GURU || '';
                    jam = jInfo.JAM_KE || jInfo.JAM || '';
                    materi = jInfo.MATERI || '';
                }

                // RowSpan matches exactly the remaining rows in this block
                const remainingRows = Math.min(6, totalRows - i);

                rowData.push({
                    content: {
                        isCustomInfo: true,
                        mapel: mapel,
                        guru: guru,
                        jam: jam,
                        materi: materi
                    },
                    rowSpan: remainingRows,
                    styles: { halign: 'left', valign: 'top', cellPadding: 2, fontSize: 8 }
                });
            }

            body.push(rowData);
        }

        doc.autoTable({
            head: head,
            body: body,
            startY: 44,
            theme: 'grid',
            styles: { fontSize: 7, cellPadding: 0.8, lineColor: [0, 0, 0], lineWidth: 0.1 },
            columnStyles: {
                0: { cellWidth: 9, halign: 'center' },
                1: { cellWidth: 'auto', halign: 'left' },
                2: { cellWidth: 6, halign: 'center' }, 3: { cellWidth: 6, halign: 'center' }, 4: { cellWidth: 6, halign: 'center' }, 5: { cellWidth: 6, halign: 'center' }, 6: { cellWidth: 6, halign: 'center' },
                7: { cellWidth: 6, halign: 'center' }, 8: { cellWidth: 6, halign: 'center' }, 9: { cellWidth: 6, halign: 'center' }, 10: { cellWidth: 6, halign: 'center' }, 11: { cellWidth: 6, halign: 'center' }, 12: { cellWidth: 6, halign: 'center' },
                13: { cellWidth: 60 } // Mapel info
            },
            margin: { left: margin, right: margin },
            showHead: 'firstPage',
            willDrawCell: function(data) {
                if (data.column.index === 13 && data.cell.raw && data.cell.raw.content && data.cell.raw.content.isCustomInfo) {
                    data.cell.text = []; // Clear default rendering
                }
            },
            didDrawCell: function(data) {
                if (data.column.index === 13 && data.cell.raw && data.cell.raw.content && data.cell.raw.content.isCustomInfo) {
                    const doc = data.doc;
                    const cell = data.cell;
                    const info = cell.raw.content;

                    // Only render labels/content if there is actual journal data for this block
                    const hasData = !!(info.mapel || info.guru || info.jam || info.materi);
                    if (!hasData) return;
                    
                    const startX = cell.x + 2;
                    let currentY = cell.y + 3.5;
                    const lineSpacing = 3.2;
                    const fontSize = 7.5;
                    
                    doc.setFontSize(fontSize);
                    
                    // 1. Mata Pelajaran
                    doc.setFont('helvetica', 'bold');
                    doc.text('Mata Pelajaran :', startX, currentY);
                    currentY += lineSpacing;
                    doc.setFont('helvetica', 'normal');
                    doc.text(info.mapel || '', startX, currentY);
                    currentY += lineSpacing + 1.2;
                    
                    // 2. Guru Mapel
                    doc.setFont('helvetica', 'bold');
                    doc.text('Guru Mapel :', startX, currentY);
                    currentY += lineSpacing;
                    doc.setFont('helvetica', 'normal');
                    doc.text(info.guru || '', startX, currentY);
                    currentY += lineSpacing + 1.2;
                    
                    // 3. Jam Pelajaran
                    doc.setFont('helvetica', 'bold');
                    doc.text('Jam Pelajaran : ', startX, currentY);
                    const labelWidth = doc.getTextWidth('Jam Pelajaran : ');
                    doc.setFont('helvetica', 'normal');
                    doc.text(String(info.jam || ''), startX + labelWidth, currentY);
                    currentY += lineSpacing + 1.2;
                    
                    // 4. Materi
                    doc.setFont('helvetica', 'bold');
                    doc.text('Materi :', startX, currentY);
                    currentY += lineSpacing;
                    doc.setFont('helvetica', 'normal');
                    
                    const maxWidth = cell.width - 4;
                    const splitMateri = doc.splitTextToSize(info.materi || '', maxWidth);
                    splitMateri.forEach(line => {
                        doc.text(line, startX, currentY);
                        currentY += lineSpacing;
                    });
                }
            }
        });

        // Kolom Pengesahan
        let finalY = doc.lastAutoTable.finalY + 5;
        const pageHeight = doc.internal.pageSize.getHeight();
        
        // Safety check: if signatures exceed page height, push to a new page
        if (finalY + 45 > pageHeight) {
            doc.addPage();
            finalY = 15; // Reset Y position on new page
        }
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text('Wakil Kepala Sekolah', margin + 25, finalY + 15, { align: 'center' });
        doc.text('Bid. Kurikulum', margin + 25, finalY + 19, { align: 'center' });
        doc.text('Guru BK', pageWidth / 2, finalY + 15, { align: 'center' });
        doc.text('Wali Kelas', pageWidth - margin - 25, finalY + 15, { align: 'center' });

        doc.text(`${wakakurName}`, margin + 25, finalY + 35, { align: 'center' });
        doc.text(`NIP. ${wakakurNip}`, margin + 25, finalY + 39, { align: 'center' });

        doc.text(`${guruBkName}`, pageWidth / 2, finalY + 35, { align: 'center' });
        doc.text(`NIP. ${guruBkNip}`, pageWidth / 2, finalY + 39, { align: 'center' });

        doc.text(`${waliKelasName}`, pageWidth - margin - 25, finalY + 35, { align: 'center' });
        doc.text(`NIP. ${waliKelasNip}`, pageWidth - margin - 25, finalY + 39, { align: 'center' });

        // Save file
        const fileName = `Format_Jurnal_${kelas || 'Kosong'}.pdf`;
        doc.save(fileName);
        showToast('PDF Format Jurnal berhasil dibuat', 'success');
    }

    const journalModal = document.getElementById('journal-modal');
    const modalJournalTitle = document.getElementById('modal-journal-title');
    const modalJournalBody = document.getElementById('modal-journal-body');
    const closeJournalModal = document.getElementById('close-journal-modal');
    const editJournalBtn = document.getElementById('edit-journal-modal-btn') || document.getElementById('edit-journal-btn');
    const menuIsiJurnal = document.getElementById('menu-isi-jurnal');
    const journalFormScreen = document.getElementById('journal-form-screen');
    const backFromJurnalForm = document.getElementById('back-from-jurnal-form');
    const journalEntryForm = document.getElementById('journal-entry-form');

    // Teacher Profile Elements
    const teacherProfileScreen = document.getElementById('teacher-profile-screen');
    const menuTeacherProfile = document.getElementById('menu-teacher-profile');
    const backFromProfile = document.getElementById('back-from-profile');
    const profileDetailAvatar = document.getElementById('profile-detail-avatar');
    const profileDetailName = document.getElementById('profile-detail-name');
    const profileDetailNip = document.getElementById('profile-detail-nip');
    const profileDetailKode = document.getElementById('profile-detail-kode');
    const btnChangePasswordProfile = document.getElementById('btn-change-password-profile');
    const btnEditAvatar = document.getElementById('btn-edit-avatar');
    const avatarPickerModal = document.getElementById('avatar-picker-modal');
    const btnAvatarCamera = document.getElementById('btn-avatar-camera');
    const btnAvatarGallery = document.getElementById('btn-avatar-gallery');
    const btnCloseAvatarPicker = document.getElementById('btnCloseAvatarPicker') || document.getElementById('btn-close-avatar-picker');
    const inputAvatarGallery = document.getElementById('input-avatar-gallery');
    const btnChangePhoto = document.getElementById('btn-change-photo'); // declared to prevent ReferenceError (element may not exist)
    const toggleDarkMode = document.getElementById('toggle-dark-mode');
    const syncStatusBadge = document.getElementById('sync-status-badge');
    const statusBadge = document.getElementById('online-status-badge');

    // Student Status Modal Elements
    const statusStudentModal = document.getElementById('status-student-modal');
    const statusStudentName = document.getElementById('status-student-name');
    const selectStudentStatus = document.getElementById('select-student-status');
    const cancelStatusStudentBtn = document.getElementById('cancel-status-student-btn');
    const saveStatusStudentBtn = document.getElementById('save-status-student-btn');
    let currentEditingStudent = null;
    let currentEditingClass = null;
    let currentEditingStudentsList = null;

    if (cancelStatusStudentBtn) {
        cancelStatusStudentBtn.addEventListener('click', () => {
            statusStudentModal.classList.add('hidden');
        });
    }

    if (saveStatusStudentBtn) {
        saveStatusStudentBtn.addEventListener('click', () => {
            if (currentEditingStudent) {
                const newStatus = selectStudentStatus.value;
                const oldStatus = String(currentEditingStudent.STATUS || '').trim().toUpperCase();
                
                if (oldStatus !== newStatus.toUpperCase() && !(oldStatus === '' && newStatus === 'Aktif')) {
                    const name = currentEditingStudent.NAMA_PESERTA_DIDIK || currentEditingStudent.NAMA;
                    if (confirm(`Yakin ingin mengubah status siswa "${name}" menjadi ${newStatus.toUpperCase()}?`)) {
                        handleUpdateStudentStatus(currentEditingStudent.NIS, name, newStatus, saveStatusStudentBtn, currentEditingClass, currentEditingStudentsList);
                    }
                } else {
                    statusStudentModal.classList.add('hidden');
                }
            }
        });
    }

    function updateOnlineStatus() {
        const isOnline = navigator.onLine;
        console.log('Connectivity Check:', isOnline ? 'ONLINE' : 'OFFLINE');

        if (isOnline) {
            document.body.classList.remove('offline-mode');
            if (statusBadge) {
                statusBadge.innerHTML = '● Online';
                statusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
                statusBadge.style.color = '#10b981';
            }
        } else {
            document.body.classList.add('offline-mode');
            if (statusBadge) {
                statusBadge.innerHTML = '● Offline';
                statusBadge.style.background = 'rgba(239, 68, 68, 0.2)';
                statusBadge.style.color = '#ef4444';
            }
            showToast('⚠️ Koneksi Terputus. Anda masuk ke Mode Offline.', 'warning');
        }

        // Update mobile status bar color
        const isDark = document.body.classList.contains('dark-mode');
        const themeMeta = document.querySelector('meta[name="theme-color"]');
        if (themeMeta) {
            if (!isOnline) {
                themeMeta.setAttribute('content', '#f43f5e'); // Red when offline
            } else {
                themeMeta.setAttribute('content', isDark ? '#0f172a' : '#6366f1');
            }
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    // Safety interval check every 5s
    setInterval(updateOnlineStatus, 5000);

    // Settings Elements
    const menuSettings = document.getElementById('menu-settings');
    const settingsScreen = document.getElementById('settings-screen');
    const backFromSettings = document.getElementById('back-from-settings');
    const btnChangePasswordSettings = document.getElementById('btn-change-password-settings');
    const btnClearCache = document.getElementById('btn-clear-cache');

    const inputTanggalDisplay = document.getElementById('jurnal-tanggal-display');
    const inputTanggalRaw = document.getElementById('jurnal-tanggal-raw');

    const jamDropdownBtn = document.getElementById('jam-dropdown-btn');
    const selectedJamText = document.getElementById('selected-jam-text');
    const jamChecklistContainer = document.getElementById('jam-checklist-container');

    // Literasi Elements
    const menuLiterasi = document.getElementById('menu-literasi');
    const literasiRekapScreen = document.getElementById('literasi-rekap-screen');
    const literasiRekapContainer = document.getElementById('literasi-rekap-container');
    const btnAddLiterasi = document.getElementById('btn-add-literasi');
    const backFromLiterasiRekap = document.getElementById('back-from-literasi-rekap');
    const literasiFormScreen = document.getElementById('literasi-form-screen');
    const backFromLiterasiForm = document.getElementById('back-from-literasi-form');
    const literasiEntryForm = document.getElementById('literasi-entry-form');
    const literasiTanggalDisplay = document.getElementById('literasi-tanggal-display');
    const selectLiterasiKelas = document.getElementById('literasi-kelas');
    const selectLiterasiRuang = document.getElementById('literasi-ruang');
    const openCameraLiterasi = document.getElementById('open-camera-literasi');
    const literasiCapturedImg = document.getElementById('literasi-captured-img');
    const literasiPhotoPlaceholder = document.getElementById('literasi-photo-placeholder');
    const retakePhotoLiterasi = document.getElementById('retake-photo-literasi');

    // Piket Elements
    const menuPiket = document.getElementById('menu-piket');
    const piketFormScreen = document.getElementById('piket-form-screen');
    const backFromPiketForm = document.getElementById('back-from-piket-form');
    const piketEntryForm = document.getElementById('piket-entry-form');
    const piketTanggalDisplay = document.getElementById('piket-tanggal-display');
    const selectPiketJam = document.getElementById('piket-jam');
    const selectPiketGuruAbsent = document.getElementById('piket-guru-absent');
    const selectPiketKelas = document.getElementById('piket-kelas');

    // Siswa Izin Elements
    const menuIzinSiswa = document.getElementById('menu-izin-siswa');
    const siswaIzinScreen = document.getElementById('siswa-izin-screen');
    const backFromSiswaIzin = document.getElementById('back-from-siswa-izin');
    const siswaIzinForm = document.getElementById('siswa-izin-form');
    const izinTanggalDisplay = document.getElementById('izin-tanggal-display');
    const selectIzinKelas = document.getElementById('izin-kelas');
    const selectIzinSiswa = document.getElementById('izin-siswa');
    const inputIzinNIS = document.getElementById('izin-nis');
    const openCameraIzin = document.getElementById('open-camera-izin');
    const izinCapturedImg = document.getElementById('izin-captured-img');
    const retakePhotoIzin = document.getElementById('retake-photo-izin');

    const siswaIzinListScreen = document.getElementById('siswa-izin-list-screen');
    const siswaIzinListContainer = document.getElementById('siswa-izin-list-container');
    const btnAddIzin = document.getElementById('btn-add-izin');
    const backFromIzinList = document.getElementById('back-from-izin-list');

    // Calendar Elements
    const menuCalendar = document.getElementById('menu-calendar');
    const calendarScreen = document.getElementById('calendar-screen');
    const backFromCalendar = document.getElementById('back-from-calendar');
    const agendaList = document.getElementById('agenda-list');

    // Summary Stats Elements
    const statJurnalCount = document.getElementById('stat-jurnal-count');
    const statIzinCount = document.getElementById('stat-izin-count');
    const statClock = document.getElementById('stat-clock');
    const statJamPelajaran = document.getElementById('stat-jam-pelajaran');

    const selectMapel = document.getElementById('jurnal-mapel');
    const selectKelas = document.getElementById('jurnal-kelas');
    const inputRuang = document.getElementById('jurnal-ruang');
    const datalistRuang = document.getElementById('ruang-list');
    const inputMateri = document.getElementById('jurnal-materi');

    const totalSiswaVal = document.getElementById('total-siswa-val');
    const hadirSiswaVal = document.getElementById('hadir-siswa-val');
    const studentAttendanceList = document.getElementById('student-attendance-list');

    // Camera Elements
    const openCameraBtn = document.getElementById('open-camera-btn');
    const cameraModal = document.getElementById('camera-modal');
    const cameraFeed = document.getElementById('camera-feed');
    const captureBtn = document.getElementById('capture-btn');
    const closeCameraModal = document.getElementById('close-camera-modal');
    const cameraCanvas = document.getElementById('camera-canvas');
    const capturedPhotoImg = document.getElementById('captured-photo-img');
    const photoPlaceholderText = document.getElementById('photo-placeholder-text');
    const retakePhotoBtn = document.getElementById('retake-photo-btn');
    const switchCameraBtn = document.getElementById('switch-camera-btn');
    const cameraZoomSlider = document.getElementById('camera-zoom-slider');
    const cameraZoomVal = document.getElementById('camera-zoom-val');
    const mirrorCameraBtn = document.getElementById('mirror-camera-btn');

    let usersData = JSON.parse(localStorage.getItem('cached_users') || '[]');
    let studentsData = [];
    let roomsData = [];
    let subjectsData = [];
    let jurnalData = [];
    let literasiData = [];
    let pendingStudentAttendanceRefresh = '';
    let piketData = [];
    let dokData = [];
    let bkData = [];

    let isDataLoaded = false;
    let isEditMode = false;
    let currentEditingId = null;
    let originalJournalKeys = null;
    let capturedPhotoData = null;
    let literasiCapturedPhotoData = null;
    let izinCapturedPhotoData = null;
    let currentCameraTarget = 'journal';

    // Calendar State
    let allCalendarEvents = [];
    let calendarViewDate = new Date();
    let selectedCalendarDate = new Date();

    // Slider State
    let currentSlide = 0;
    let sliderInterval = null;

    let cameraStream = null;
    let currentFacingMode = 'environment';
    let currentZoom = 1;
    let isMirrored = false;

    // Helper untuk mengambil nilai dari berbagai kemungkinan nama kolom (Case Insensitive)
    function getVal(obj, possibleKeys) {
        if (!obj) return '';
        const keys = Object.keys(obj);
        for (let pKey of possibleKeys) {
            const foundKey = keys.find(k => k === pKey || k.startsWith(pKey));
            if (foundKey) return obj[foundKey];
        }
        return '';
    }

    // Helper untuk Generate Password
    function generatePass() {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let result = "";
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Helper Format Tanggal Indonesia (DD MMMM YYYY)
    function formatDateIndo(dateStr) {
        if (!dateStr) return '';

        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        // Handle Gviz Date format: Date(2026,4,13)
        if (dateStr.includes('Date(')) {
            const parts = dateStr.match(/\d+/g);
            if (parts && parts.length >= 3) {
                const d = new Date(parts[0], parts[1], parts[2]);
                return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
            }
        }

        // Handle string format DD/MM/YYYY
        const slashParts = dateStr.split('/');
        if (slashParts.length === 3) {
            const day = parseInt(slashParts[0]);
            const month = parseInt(slashParts[1]) - 1;
            const year = slashParts[2];
            if (!isNaN(day) && month >= 0 && month < 12) {
                return `${day} ${months[month]} ${year}`;
            }
        }

        // Handle string format YYYY-MM-DD
        const dashParts = dateStr.split('-');
        if (dashParts.length === 3 && dashParts[0].length === 4) {
            const year = dashParts[0];
            const month = parseInt(dashParts[1]) - 1;
            const day = parseInt(dashParts[2]);
            if (!isNaN(day) && month >= 0 && month < 12) {
                return `${day} ${months[month]} ${year}`;
            }
        }

        return dateStr;
    }

    // Spreadsheet & Drive IDs
    const LOGIN_SID = '1yhcBW-lFTtYvewsfb4SghLYN5OSmaVAgMCu0BJ_a8qo';
    const DATA_SID = '1yhcBW-lFTtYvewsfb4SghLYN5OSmaVAgMCu0BJ_a8qo';
    const DRIVE_FOLDER_ID = '17EUqAWL8vLo3uN1jcAEO5ddpq3z-kwjp';
    const UPLOAD_API_URL = 'https://script.google.com/macros/s/AKfycbyahPKtTZVEega7h7fe3fK_-UxKAYS-hgVn8VUI6RhBFqBebDSNsz--0XHnyS8VWXYi/exec';

    // Helper to parse Gviz response
    function parseGviz(response) {
        const data = response.table;
        const cols = data.cols.map((c, i) => {
            let label = (c.label || '').toUpperCase().trim();
            label = label.replace(/\s+/g, '_');
            return label || `COL${i}`;
        });

        console.log('--- Pemetaan Kolom Spreadsheet ---');
        cols.forEach((name, i) => console.log(`Kolom ${i}: ${name}`));

        return data.rows.map(r => {
            const obj = {};
            r.c.forEach((cell, i) => {
                const colName = cols[i];
                if (colName) {
                    const val = (cell && cell.f !== undefined && cell.f !== null) ? String(cell.f) :
                        (cell && cell.v !== null && cell.v !== undefined ? String(cell.v) : '');
                    obj[colName] = val.trim();
                }
            });
            return obj;
        });
    }

    // Global callbacks
    window.handleUserResponse = (response) => {
        usersData = parseGviz(response);
        localStorage.setItem('cached_users', JSON.stringify(usersData));
    };

    window.handleStudentResponse = (response) => {
        studentsData = parseGviz(response);
        if (pendingStudentAttendanceRefresh) {
            if (selectKelas && selectKelas.value === pendingStudentAttendanceRefresh) {
                renderStudentAttendanceList(selectKelas.value);
            }
            pendingStudentAttendanceRefresh = '';
        }
    };

    window.handleRoomResponse = (response) => {
        roomsData = parseGviz(response);
    };

    window.handleSubjectResponse = (response) => {
        subjectsData = parseGviz(response);
    };

    window.handleJurnalResponse = (response) => {
        jurnalData = parseGviz(response);
        isDataLoaded = true;
        // Auto re-render rekap if screen is active
        const rekapScreen = document.getElementById('rekap-screen');
        if (rekapScreen && rekapScreen.classList.contains('active')) {
            if (typeof renderRekapList === 'function') renderRekapList();
        }
    };

    window.handleLiterasiResponse = (response) => {
        literasiData = parseGviz(response);
        // Auto re-render if the literasi rekap screen is currently visible
        const rekapScreen = document.getElementById('literasi-rekap-screen');
        if (rekapScreen && rekapScreen.classList.contains('active')) {
            if (typeof renderLiterasiRekapList === 'function') renderLiterasiRekapList();
        }
    };

    window.handleIzinResponse = (response) => {
        siswaIzinData = parseGviz(response);
        window.siswaIzinData = siswaIzinData; // Ensure it's globally available

        // Auto re-render if the siswa izin list screen is currently visible
        const izinScreen = document.getElementById('siswa-izin-list-screen');
        if (izinScreen && izinScreen.classList.contains('active')) {
            if (typeof renderSiswaIzinList === 'function') renderSiswaIzinList();
        }

        // Auto re-render attendance list in journal form if currently active and class is selected
        const journalScreen = document.getElementById('journal-form-screen');
        if (journalScreen && journalScreen.classList.contains('active')) {
            if (selectKelas && selectKelas.value) {
                renderStudentAttendanceList(selectKelas.value);
            }
        }

        updateTodaySummary();
    };

    window.handlePiketResponse = (response) => {
        piketData = parseGviz(response);
        console.log('✓ Data Piket dimuat:', piketData.length);
    };

    window.handleDokResponse = (response) => {
        dokData = parseGviz(response);
        localStorage.setItem('cached_dok', JSON.stringify(dokData));
        console.log('📄 Data Dokumen (DOK) dimuat:', dokData.length);
    };

    window.handleBkResponse = (response) => {
        bkData = parseGviz(response);
        localStorage.setItem('cached_bk', JSON.stringify(bkData));
        console.log('👨‍🏫 Data Guru BK (BK) dimuat:', bkData.length);
    };

    function initializeApp() {
        console.log('Memulai sinkronisasi data...');
        if (syncStatusBadge) {
            syncStatusBadge.addEventListener('click', () => {
                if (!navigator.onLine) {
                    showToast('❌ Gagal Sinkron. Anda masih Offline.', 'error');
                    return;
                }
                showToast('🔄 Sinkronisasi data dimulai...', 'info');
                if (typeof syncOfflineData === 'function') {
                    syncOfflineData();
                }
            });
        }

        updateOnlineStatus(); // Check initial status

        try {
            window.loadSheet = (id, name, callback) => {
                const script = document.createElement('script');
                script.src = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=responseHandler:${callback}&sheet=${encodeURIComponent(name)}&headers=1&tcb=${Date.now()}`;
                script.onerror = () => console.error(`Gagal memuat sheet: ${name}`);
                document.body.appendChild(script);
            };

            window.refreshBackgroundData = function () {
                if (!navigator.onLine) return;
                window.loadSheet(DATA_SID, 'JURNAL', 'handleJurnalResponse');
                window.loadSheet(DATA_SID, 'LITERASI', 'handleLiterasiResponse');
                window.loadSheet(DATA_SID, 'SISWAIZIN', 'handleIzinResponse');
                window.loadSheet(DATA_SID, 'PIKETGURU', 'handlePiketResponse');
                window.loadSheet(DATA_SID, 'DOK', 'handleDokResponse');
                window.loadSheet(DATA_SID, 'BK', 'handleBkResponse');

                // Cleanup old JSONP script tags
                const oldScripts = document.querySelectorAll('script[src*="docs.google.com/spreadsheets"]');
                if (oldScripts.length > 20) {
                    for (let i = 0; i < oldScripts.length - 10; i++) {
                        oldScripts[i].remove();
                    }
                }
            };

            window.loadSheet(LOGIN_SID, 'LOGIN', 'handleUserResponse');
            window.loadSheet(DATA_SID, 'DATASISWA', 'handleStudentResponse');
            window.loadSheet(DATA_SID, 'RUANG', 'handleRoomResponse');
            window.loadSheet(DATA_SID, 'MAPEL', 'handleSubjectResponse');
            window.refreshBackgroundData();

            setTimeout(() => {
                try {
                    const isRemembered = localStorage.getItem('rememberMe') === 'true';
                    if (!isRemembered) {
                        if (!sessionStorage.getItem('sessionActive')) {
                            localStorage.removeItem('isLoggedIn');
                            localStorage.removeItem('userData');
                        }
                    }
                    sessionStorage.setItem('sessionActive', 'true');

                    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                    const savedUser = JSON.parse(localStorage.getItem('userData') || '{}');

                    splashScreen.classList.remove('active');
                    splashScreen.classList.add('hidden');

                    if (isLoggedIn && (savedUser.NIP || savedUser.KODEGURU)) {
                        updateDashboard(savedUser);
                        dashboardScreen.classList.remove('hidden');
                        dashboardScreen.classList.add('active');
                        history.replaceState({ screen: 'dashboard-screen' }, "");
                    } else {
                        loginScreen.classList.remove('hidden');
                        loginScreen.classList.add('active');
                        history.replaceState({ screen: 'login-screen' }, "");
                    }

                    // Start digital clock (run once)
                    startDigitalClock();

                    // Auto-fetch calendar data
                    fetchCalendarData();
                } catch (innerErr) {
                    console.error('Inner Init Error:', innerErr);
                    splashScreen.classList.add('hidden');
                    loginScreen.classList.remove('hidden');
                    loginScreen.classList.add('active');
                }
            }, 2500);
        } catch (outerErr) {
            console.error('Outer Init Error:', outerErr);
            showAlert('❌ Gagal', 'Gagal menginisialisasi aplikasi. Silakan bersihkan cache browser Anda.', 'error');
        }
    }

    initializeApp();

    // Watchdog: jika splash screen masih tampil setelah 8 detik, sembunyikan dan tampilkan login
    setTimeout(() => {
        try {
            if (splashScreen && !splashScreen.classList.contains('hidden')) {
                console.warn('Watchdog: splash screen masih aktif, memaksa beralih ke login.');
                splashScreen.classList.remove('active');
                splashScreen.classList.add('hidden');
                if (loginScreen) {
                    loginScreen.classList.remove('hidden');
                    loginScreen.classList.add('active');
                    history.replaceState({ screen: 'login-screen' }, "");
                }
                showToast('Perhatian: proses inisialisasi memakan waktu lama. Beralih ke halaman login.', 'warning');
            }
        } catch (e) {
            console.error('Watchdog error:', e);
        }
    }, 8000);

    const togglePassword = document.getElementById('toggle-password');
    const passwordField = document.getElementById('password');

    if (togglePassword && passwordField) {
        togglePassword.addEventListener('click', () => {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!isDataLoaded) {
            showToast('Mohon tunggu, data sedang dimuat...', 'warning');
            return;
        }

        const nipInput = document.getElementById('email').value.trim();
        const passwordInput = document.getElementById('password').value.trim();
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const errorMsg = document.getElementById('login-error');
        const originalText = submitBtn.innerText;

        errorMsg.style.display = 'none';
        submitBtn.innerText = 'Memverifikasi...';
        submitBtn.disabled = true;

        setTimeout(() => {
            const input = nipInput.toUpperCase();

            let user = usersData.find(u => {
                const dbNIP = (u.NIP || '').toUpperCase();
                const dbKode = (u.KODEGURU || u['KODE GURU'] || '').toUpperCase();
                return dbNIP === input || dbKode === input;
            });

            if (!user) {
                user = usersData.find(u => (u.NAMA || '').toUpperCase() === input);
            }

            if (!user) {
                user = usersData.find(u => (u.NAMA || '').toUpperCase().includes(input));
            }

            if (user) {
                const tempStore = JSON.parse(localStorage.getItem('tempPasswords') || '{}');
                const userNIP = user.NIP || user.KODEGURU;
                const hasTempPass = tempStore[userNIP];

                const dbPassword = hasTempPass ? hasTempPass.pass : getVal(user, ['PASSWORD', 'KATA', 'SANDI', 'PW', 'COL3']);
                const expectedPassword = String(dbPassword || '').trim();

                if (passwordInput === expectedPassword && expectedPassword !== '') {
                    if (hasTempPass && hasTempPass.isTemp) {
                        localStorage.setItem('pendingUser', JSON.stringify(user));
                        switchScreen('login-screen', 'change-password-screen');
                    } else {
                        const rememberMe = document.getElementById('remember-me').checked;
                        localStorage.setItem('rememberMe', rememberMe);

                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('userData', JSON.stringify(user));
                        updateDashboard(user);
                        switchScreen('login-screen', 'dashboard-screen');
                        showInfoPopup();
                    }
                } else {
                    errorMsg.innerText = 'Kata sandi salah.';
                    errorMsg.style.display = 'block';
                }
            } else {
                errorMsg.innerText = 'Data tidak ditemukan.';
                errorMsg.style.display = 'block';
            }

            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }, 800);
    });

    document.getElementById('forgot-password-link').addEventListener('click', (e) => {
        e.preventDefault();
        switchScreen('login-screen', 'forgot-password-screen');
    });

    document.querySelectorAll('.back-to-login').forEach(btn => {
        btn.addEventListener('click', () => {
            switchScreen('forgot-password-screen', 'login-screen');
        });
    });

    const forgotForm = document.getElementById('forgot-form');
    forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nipInput = document.getElementById('forgot-nip').value.trim().toUpperCase();
        const user = usersData.find(u => (u.NIP || '').toUpperCase() === nipInput);

        if (user) {
            const newPass = generatePass();
            const tempStore = JSON.parse(localStorage.getItem('tempPasswords') || '{}');
            tempStore[user.NIP] = { pass: newPass, isTemp: true };
            localStorage.setItem('tempPasswords', JSON.stringify(tempStore));

            showAlert('✅ Password Baru', `Password baru Anda adalah: <b style="font-size:1.2rem; color:var(--primary);">${newPass}</b><br><br>Silakan login menggunakan password ini.`, 'success');
            switchScreen('forgot-password-screen', 'login-screen');
        } else {
            showToast('NIP tidak terdaftar di sistem.', 'error');
        }
    });

    const changeForm = document.getElementById('change-form');
    changeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newPass = document.getElementById('new-password').value;
        const confirmPass = document.getElementById('confirm-password').value;

        if (newPass.length < 6) {
            showToast('Password minimal 6 karakter.', 'warning');
            return;
        }

        if (newPass !== confirmPass) {
            showToast('Konfirmasi password tidak cocok.', 'error');
            return;
        }

        const user = JSON.parse(localStorage.getItem('pendingUser') || localStorage.getItem('userData') || '{}');
        const tempStore = JSON.parse(localStorage.getItem('tempPasswords') || '{}');

        const userNIP = user.NIP || user.KODEGURU;
        tempStore[userNIP] = { pass: newPass, isTemp: false };
        localStorage.setItem('tempPasswords', JSON.stringify(tempStore));

        // If it was a pending user (first login), clear it
        if (localStorage.getItem('pendingUser')) {
            localStorage.removeItem('pendingUser');
        }

        // Sync to Google Sheets
        syncNewPassword(newPass);

        showAlert('✅ Berhasil', 'Password berhasil diperbarui! Silakan login kembali.', 'success');
        switchScreen('change-password-screen', 'login-screen');
    });

    const btnCancelChangePassword = document.getElementById('btn-cancel-change-password');
    if (btnCancelChangePassword) {
        btnCancelChangePassword.addEventListener('click', () => {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (isLoggedIn) {
                switchScreen('change-password-screen', 'settings-screen');
            } else {
                switchScreen('change-password-screen', 'login-screen');
            }
        });
    }

    function switchScreen(fromId, toId, isPopState = false) {
        document.getElementById(fromId).classList.remove('active');
        document.getElementById(fromId).classList.add('hidden');
        const toScreen = document.getElementById(toId);
        toScreen.classList.remove('hidden');
        toScreen.classList.add('active');

        if (toId === 'dashboard-screen') {
            updateSyncStatus();
        }

        if (toId === 'journal-form-screen' && selectKelas && selectKelas.value) {
            if (navigator.onLine && typeof window.loadSheet === 'function') {
                pendingStudentAttendanceRefresh = selectKelas.value;
                window.loadSheet(DATA_SID, 'DATASISWA', 'handleStudentResponse');
            } else {
                renderStudentAttendanceList(selectKelas.value);
            }
        }

        if (!isPopState) {
            history.pushState({ screen: toId }, "");
        }
    }

    window.addEventListener('popstate', (e) => {
        const state = e.state;
        if (state && state.screen) {
            const currentActive = document.querySelector('.screen.active');
            if (currentActive && currentActive.id !== state.screen) {
                switchScreen(currentActive.id, state.screen, true);
            }
        }
    });

    function updateSyncStatus() {
        if (!syncStatusBadge) return;

        const getPendingCount = (key) => {
            const items = JSON.parse(localStorage.getItem(key) || '[]');
            return items.filter(i => i.SYNC_STATUS !== 'SUCCESS').length;
        };

        const journalCount = getPendingCount('cached_jurnals');
        const literasiCount = getPendingCount('cached_literasi');
        const piketCount = getPendingCount('cached_piket');
        const izinCount = getPendingCount('cached_siswa_izin');

        const totalPending = journalCount + literasiCount + piketCount + izinCount;

        if (totalPending > 0) {
            syncStatusBadge.classList.remove('hidden');
            syncStatusBadge.innerHTML = `🔄 ${totalPending} Pending`;
        } else {
            syncStatusBadge.classList.add('hidden');
        }
    }

    function updateDashboard(user) {
        const userNameElements = document.querySelectorAll('.user-profile p:nth-child(2)');
        userNameElements.forEach(el => el.innerText = user.NAMA || 'User');

        const avatar = document.querySelector('.avatar');
        if (avatar && user.NAMA) {
            avatar.innerText = user.NAMA.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        }

        // Update Stats Slide
        const userNama = (user.NAMA || '').toUpperCase().trim();
        const cachedData = JSON.parse(localStorage.getItem('cached_jurnals') || '[]');
        const filteredServerData = jurnalData.filter(j => {
            const dbNama = (j.NAMA_GURU || j.NAMA || '').toUpperCase().trim();
            return userNama && dbNama === userNama;
        });
        const combined = [...filteredServerData];
        cachedData.forEach(c => {
            const exists = combined.find(s =>
                s.TANGGAL === c.TANGGAL &&
                (s.JAM_KE || s.JAM) === (c.JAM_KE || c.JAM) &&
                (s.KELAS || '') === (c.KELAS || '')
            );
            if (!exists) combined.push(c);
        });
        const totalEntries = combined.length;

        const summaryText = document.getElementById('journal-summary-text');
        const percentDiv = document.getElementById('journal-completion-percent');

        if (summaryText) {
            summaryText.innerText = `Total: ${totalEntries} entri bulan ini`;
        }

        if (percentDiv) {
            const target = Number(user.TARGET_ENTRI) || 20; // Target entri per bulan dinamis
            const percentage = Math.min(Math.round((totalEntries / target) * 100), 100);
            percentDiv.innerText = `${percentage}% Selesai`;
        }

        const inputTargetEntri = document.getElementById('input-target-entri');
        if (inputTargetEntri) {
            inputTargetEntri.value = Number(user.TARGET_ENTRI) || 20;
        }

        // Restrict Siswa Izin & Laporan Kehadiran to GURU BK only, and Rekap Guru Mapel to Subject Teachers only
        const userRole = (getVal(user, ['JABATAN', 'STATUS', 'KET', 'ROLE']) || '').toUpperCase();
        const isGuruBK = userRole.includes('GURU BK') || userRole.includes('BK');

        if (menuIzinSiswa) {
            menuIzinSiswa.style.display = isGuruBK ? 'block' : 'none';
        }

        if (menuLaporanKehadiran) {
            menuLaporanKehadiran.style.display = isGuruBK ? 'block' : 'none';
        }

        if (menuRekapGuruMapel) {
            menuRekapGuruMapel.style.display = !isGuruBK ? 'block' : 'none';
        }

        // Update Stats Slide
        // (Stats logic already present...)

        // Update Today Summary Stats
        updateTodaySummary();

        // Update Today's Agenda from cache first then fetch
        updateDashboardAgenda();

        // Start/Reset Slider
        initDashboardSlider();
    }

    function initDashboardSlider() {
        if (sliderInterval) clearInterval(sliderInterval);

        const track = document.getElementById('slider-track');
        const dot0 = document.getElementById('dot-0');
        const dot1 = document.getElementById('dot-1');

        if (!track) return;

        currentSlide = 0;
        track.style.transform = 'translateX(0)';
        if (dot0) dot0.style.opacity = '1';
        if (dot1) dot1.style.opacity = '0.3';

        sliderInterval = setInterval(() => {
            currentSlide++;
            const offset = currentSlide * -100;

            // Add transition back in case it was removed
            track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            track.style.transform = `translateX(${offset}%)`;

            // Handle Indicators (Loop back to 0 if at index 3)
            const indicatorIndex = currentSlide % 3;
            for (let i = 0; i < 3; i++) {
                const dot = document.getElementById(`dot-${i}`);
                if (dot) dot.style.opacity = indicatorIndex === i ? '1' : '0.3';
            }

            // If we reached the clone (Slide 3)
            if (currentSlide === 3) {
                setTimeout(() => {
                    // Instantly jump back to Slide 0 without animation
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(0)';
                    currentSlide = 0;
                }, 600); // Match transition duration
            }
        }, 5000);
    }

    async function updateDashboardAgenda() {
        const todayElem = document.getElementById('today-agenda-list');
        const todayCloneElem = document.getElementById('today-agenda-list-clone');
        const upcomingElem = document.getElementById('upcoming-agenda-list');
        if (!todayElem || !upcomingElem) return;

        if (allCalendarEvents.length === 0) {
            const cached = localStorage.getItem('last_calendar_data');
            if (cached) allCalendarEvents = parseICS(cached);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

        // Filter Today
        const todayEvents = allCalendarEvents.filter(e => {
            const eDate = new Date(e.date);
            return `${eDate.getFullYear()}-${eDate.getMonth() + 1}-${eDate.getDate()}` === todayStr;
        });

        // Helper to render Today HTML
        const renderToday = (events) => {
            if (events.length === 0) return '<p style="font-size: 1rem; opacity: 0.8; font-weight: 700;">Tidak ada agenda hari ini.</p>';
            return events.map(e => `
                <div style="margin-bottom: 0.5rem; padding-left: 0.75rem; border-left: 3px solid white;">
                    <div style="font-weight: 700; font-size: 1.1rem; line-height: 1.2;">${e.title}</div>
                </div>
            `).join('');
        };

        const todayHtml = renderToday(todayEvents);
        todayElem.innerHTML = todayHtml;
        if (todayCloneElem) todayCloneElem.innerHTML = todayHtml;

        // Filter Upcoming (Future)
        const upcomingEvents = allCalendarEvents.filter(e => {
            const eDate = new Date(e.date);
            eDate.setHours(0, 0, 0, 0);
            return eDate.getTime() > today.getTime();
        }).slice(0, 2);

        // Render Upcoming
        if (upcomingEvents.length === 0) {
            upcomingElem.innerHTML = '<p style="font-size: 1rem; opacity: 0.8;">Tidak ada agenda mendatang.</p>';
        } else {
            upcomingElem.innerHTML = upcomingEvents.map(e => {
                const d = new Date(e.date);
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
                const dStr = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
                return `
                <div style="margin-bottom: 0.4rem; padding-left: 0.75rem; border-left: 3px solid rgba(255,255,255,0.6);">
                    <div style="font-size: 0.75rem; opacity: 0.8; font-weight: 700;">${dStr}</div>
                    <div style="font-weight: 700; font-size: 1rem; line-height: 1.1;">${e.title}</div>
                </div>
            `}).join('');
        }

        fetchCalendarData();
    }

    function updateTodaySummary() {
        if (!statJurnalCount || !statIzinCount) return;

        const now = new Date();
        const todayStr = now.toLocaleDateString('en-CA');

        // 1. Journal Count
        const cachedJurnals = JSON.parse(localStorage.getItem('cached_jurnals') || '[]');
        const todayCached = cachedJurnals.filter(j => j.TANGGAL === todayStr).length;
        const todayServer = jurnalData.filter(j => {
            const jDate = j.TANGGAL || '';
            return jDate.includes(todayStr) || jDate === todayStr;
        }).length;
        statJurnalCount.innerText = todayCached + todayServer;

        // 2. Izin Count (Local cache + Server data)
        const cachedIzin = JSON.parse(localStorage.getItem('cached_siswa_izin') || '[]');
        const todayCachedIzin = cachedIzin.filter(i => i.TANGGAL === todayStr).length;
        const serverIzin = (window.siswaIzinData || []).filter(i => {
            const d = (i.TANGGAL || '').trim();
            return d.includes(todayStr);
        });
        // Merge: avoid counting duplicates (same NIS and date)
        const serverOnlyIzin = serverIzin.filter(si =>
            !cachedIzin.find(ci => ci.NIS === si.NIS && ci.TANGGAL === si.TANGGAL)
        );
        statIzinCount.innerText = todayCachedIzin + serverOnlyIzin.length;
    }

    function showInfoPopup() {
        showAlert('📢 Informasi', 'Jangan lupa siapkan dokumen pembelajaran', 'info');
    }

    function startDigitalClock() {
        const SCHEDULE_REGULAR = [
            { label: 'Jam 1', start: '07:00', end: '07:50' },
            { label: 'Jam 2', start: '07:50', end: '08:30' },
            { label: 'Jam 3', start: '08:30', end: '09:10' },
            { label: 'Jam 4', start: '09:10', end: '09:50' },
            { label: 'Istirahat 1', start: '09:50', end: '10:05' },
            { label: 'Jam 5', start: '10:05', end: '10:45' },
            { label: 'Jam 6', start: '10:45', end: '11:25' },
            { label: 'Jam 7', start: '11:25', end: '11:50' },
            { label: 'Istirahat 2', start: '11:50', end: '12:50' },
            { label: 'Jam 8', start: '12:50', end: '13:30' },
            { label: 'Jam 9', start: '13:30', end: '14:10' },
            { label: 'Jam 10', start: '14:10', end: '14:50' },
            { label: 'Jam 11', start: '14:50', end: '15:30' },
        ];
        const SCHEDULE_FRIDAY = [
            { label: 'Jam 1', start: '07:00', end: '07:50' },
            { label: 'Jam 2', start: '07:50', end: '08:30' },
            { label: 'Jam 3', start: '08:30', end: '09:10' },
            { label: 'Jam 4', start: '09:10', end: '09:50' },
            { label: 'Istirahat 1', start: '09:50', end: '10:05' },
            { label: 'Jam 5', start: '10:05', end: '10:45' },
            { label: 'Jam 6', start: '10:45', end: '11:25' },
            { label: 'Istirahat 2', start: '11:25', end: '13:00' },
            { label: 'Jam 7', start: '13:00', end: '13:30' },
            { label: 'Jam 8', start: '13:30', end: '14:00' },
        ];

        function toMinutes(hhmm) {
            const [h, m] = hhmm.split(':').map(Number);
            return h * 60 + m;
        }

        function tick() {
            const now = new Date();
            const hh = String(now.getHours()).padStart(2, '0');
            const mm = String(now.getMinutes()).padStart(2, '0');

            if (statClock) statClock.innerText = `${hh}:${mm}`;

            if (statJamPelajaran) {
                const dayOfWeek = now.getDay(); // 5 = Friday
                const schedule = dayOfWeek === 5 ? SCHEDULE_FRIDAY : SCHEDULE_REGULAR;
                const nowMin = now.getHours() * 60 + now.getMinutes();

                const current = schedule.find(s =>
                    nowMin >= toMinutes(s.start) && nowMin < toMinutes(s.end)
                );

                if (current) {
                    statJamPelajaran.innerText = `${current.label} (${current.start}–${current.end})`;
                    statJamPelajaran.style.color = current.label.startsWith('Istirahat') ? '#f59e0b' : '#10b981';
                } else if (nowMin < toMinutes('07:00')) {
                    statJamPelajaran.innerText = 'Belum Mulai';
                    statJamPelajaran.style.color = 'var(--text-muted)';
                } else {
                    statJamPelajaran.innerText = 'Selesai';
                    statJamPelajaran.style.color = 'var(--text-muted)';
                }
            }
        }

        tick();
        setInterval(tick, 30000); // update every 30s
    }

    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.background = 'rgba(255, 255, 255, 0.9)';
        toast.style.backdropFilter = 'blur(10px)';
        toast.style.border = '1px solid rgba(255,255,255,0.2)';

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || '🔔'}</span>
            <span class="toast-message">${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = `toastOut 0.4s forwards`;
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    function showAlert(title, message, type = 'info') {
        const modal = document.getElementById('info-modal');
        const modalContent = modal ? modal.querySelector('.modal-content') : null;
        const modalTitle = document.getElementById('modal-title');
        const modalMsg = document.getElementById('modal-message');

        if (!modal || !modalTitle || !modalMsg) return;

        modalTitle.innerHTML = title;
        modalMsg.innerHTML = message;

        if (modalContent) {
            modalContent.classList.remove('success', 'error', 'info');
            modalContent.classList.add(type);
        }

        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('active'), 10);
    }

    const infoModal = document.getElementById('info-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    closeModalBtn.addEventListener('click', () => {
        infoModal.classList.remove('active');
        setTimeout(() => {
            infoModal.classList.add('hidden');
        }, 300);
    });

    menuSiswa.addEventListener('click', () => {
        renderClassList();
        switchScreen('dashboard-screen', 'students-screen');
    });



    backFromStudents.addEventListener('click', () => {
        switchScreen('students-screen', 'dashboard-screen');
    });

    backFromDetail.addEventListener('click', () => {
        switchScreen('student-detail-screen', 'students-screen');
    });

    searchClassInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        renderClassList(query);
    });

    function renderClassList(filter = '') {
        classListContainer.innerHTML = '';

        const groups = {};
        studentsData.forEach(student => {
            const className = student.KELAS || 'Tanpa Kelas';
            if (!groups[className]) groups[className] = [];
            groups[className].push(student);
        });

        // Ensure bkData is loaded
        if (bkData.length === 0) {
            bkData = JSON.parse(localStorage.getItem('cached_bk') || '[]');
        }

        const sortedClasses = Object.keys(groups).sort().filter(className => {
            const matchClass = className.toLowerCase().includes(filter);
            const bkForClass = bkData.find(b => String(b.KELAS || b.Kelas || b.kelas || '').trim() === className.trim());
            const waliVal = bkForClass ? String(bkForClass.WALIKELAS || bkForClass.WaliKelas || bkForClass.walikelas || '').toLowerCase() : '';
            const bkVal = bkForClass ? String(bkForClass.GURUBK || bkForClass.GuruBK || bkForClass.gurubk || '').toLowerCase() : '';
            const matchWali = waliVal.includes(filter);
            const matchBk = bkVal.includes(filter);
            return matchClass || matchWali || matchBk;
        });

        if (sortedClasses.length === 0) {
            classListContainer.innerHTML = '<div style="text-align:center; padding:2rem; color:var(--text-muted);">Kelas tidak ditemukan</div>';
            return;
        }

        sortedClasses.forEach(className => {
            const students = groups[className];
            const bkForClass = bkData.find(b => String(b.KELAS || b.Kelas || b.kelas || '').trim() === className.trim());
            const waliVal = bkForClass ? (bkForClass.WALIKELAS || bkForClass.WaliKelas || bkForClass.walikelas || '-') : '-';
            const bkVal = bkForClass ? (bkForClass.GURUBK || bkForClass.GuruBK || bkForClass.gurubk || '-') : '-';

            const card = document.createElement('div');
            card.className = 'class-card';
            card.style.display = 'flex';
            card.style.justifyContent = 'space-between';
            card.style.alignItems = 'center';
            card.style.padding = '1rem';
            card.style.borderRadius = '12px';
            card.style.background = 'white';
            card.style.border = '1px solid #f1f5f9';
            card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
            card.style.marginBottom = '0.75rem';
            card.style.cursor = 'pointer';
            card.style.transition = 'transform 0.2s, box-shadow 0.2s';

            card.innerHTML = `
                <div class="class-info" style="display: flex; flex-direction: column; gap: 0.2rem;">
                    <h4 style="margin: 0 0 0.25rem 0; font-size: 1rem; font-weight: 700; color: var(--primary);">${className}</h4>
                    <p style="margin: 0; font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">👥 ${students.length} Peserta Didik</p>
                    <p style="margin: 0; font-size: 0.75rem; color: var(--text-muted);"><span style="font-weight: 700; color: var(--text);">💼 Wali:</span> ${waliVal}</p>
                    <p style="margin: 0; font-size: 0.75rem; color: var(--text-muted);"><span style="font-weight: 700; color: var(--text);">🧑‍🏫 BK:</span> ${bkVal}</p>
                </div>
                <div class="class-badge" style="background: rgba(30, 64, 175, 0.08); color: var(--primary); padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase;">Detail</div>
            `;

            card.addEventListener('click', () => {
                renderStudentList(className, students);
                switchScreen('students-screen', 'student-detail-screen');
            });

            classListContainer.appendChild(card);
        });
    }

    function renderStudentList(className, students) {
        detailClassName.innerText = `Siswa ${className}`;
        studentListContainer.innerHTML = '';

        // Sort students alphabetically
        students.sort((a, b) => {
            const nameA = (a.NAMA_PESERTA_DIDIK || a.NAMA || '').toUpperCase();
            const nameB = (b.NAMA_PESERTA_DIDIK || b.NAMA || '').toUpperCase();
            return nameA.localeCompare(nameB);
        });

        // Determine if current user is BK
        const savedUser = JSON.parse(localStorage.getItem('userData') || '{}');
        const localBkData = typeof bkData !== 'undefined' ? bkData : JSON.parse(localStorage.getItem('cached_bk') || '[]');
        const isGuruBK = (
            String(savedUser.STATUS || '').toUpperCase() === 'GURU BK' ||
            String(savedUser.JABATAN || '').toUpperCase() === 'GURU BK' ||
            (localBkData && localBkData.some(b => String(b.NAMA || '').trim().toUpperCase() === String(savedUser.NAMA || '').trim().toUpperCase()))
        );
        console.log('Is Guru BK:', isGuruBK, savedUser.NAMA);

        students.forEach(student => {
            const name = student.NAMA_PESERTA_DIDIK || student.NAMA || 'Tanpa Nama';
            const nis = student.NIS || '-';
            const gender = (student.JENIS_KELAMIN || student.JENIS || '').trim().toUpperCase();
            const statusStr = String(student.STATUS || '').trim().toUpperCase();
            const isKeluar = statusStr === 'KELUAR';

            const card = document.createElement('div');
            card.className = `student-card ${gender === 'L' ? 'card-l' : (gender === 'P' ? 'card-p' : '')}`;
            card.style.flexDirection = 'column';
            card.style.alignItems = 'stretch';
            
            if (isKeluar) {
                card.style.opacity = '0.6';
                card.style.filter = 'grayscale(100%)';
            }

            let html = `
                <div style="display: flex; align-items: center; gap: 1rem; width: 100%;">
                    <div class="student-avatar" style="margin: 0;">${isKeluar ? '❌' : '👤'}</div>
                    <div class="student-info" style="margin: 0; flex-grow: 1;">
                        <h5 style="margin: 0 0 0.2rem 0; font-size: 0.9rem; color: var(--text);">${name} ${isKeluar ? '<span style="color:var(--danger); font-size: 0.7rem; margin-left: 4px;">(KELUAR)</span>' : ''}</h5>
                        <p style="margin: 0; font-size: 0.75rem; color: var(--text-muted);">NIS: ${nis}</p>
                    </div>
                </div>
            `;

            if (isGuruBK) {
                html += `
                <div class="status-actions" style="display: none; flex-direction: row; gap: 0.5rem; margin-top: 1rem; width: 100%; border-top: 1px dashed #e2e8f0; padding-top: 0.75rem;">
                    <button class="btn-set-aktif" style="flex: 1; background: ${!isKeluar ? 'var(--success)' : '#f1f5f9'}; color: ${!isKeluar ? 'white' : 'var(--text-muted)'}; border: none; padding: 0.5rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: 0.2s;">AKTIF</button>
                    <button class="btn-set-keluar" style="flex: 1; background: ${isKeluar ? 'var(--danger)' : '#f1f5f9'}; color: ${isKeluar ? 'white' : 'var(--text-muted)'}; border: none; padding: 0.5rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: 0.2s;">KELUAR</button>
                </div>
                `;
            }

            card.innerHTML = html;

            if (isGuruBK) {
                const actionDiv = card.querySelector('.status-actions');
                const btnAktif = card.querySelector('.btn-set-aktif');
                const btnKeluar = card.querySelector('.btn-set-keluar');

                card.style.cursor = 'pointer';
                
                // Toggle buttons on card click
                card.addEventListener('click', (e) => {
                    // Prevent toggle if clicking on the buttons themselves
                    if (e.target === btnAktif || e.target === btnKeluar) return;
                    
                    if (actionDiv.style.display === 'none') {
                        actionDiv.style.display = 'flex';
                    } else {
                        actionDiv.style.display = 'none';
                    }
                });

                btnAktif.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (isKeluar) {
                        if (confirm(`Yakin mengembalikan status "${name}" menjadi AKTIF?`)) {
                            actionDiv.style.display = 'none';
                            handleUpdateStudentStatus(nis, name, 'Aktif', btnAktif, className, students);
                        }
                    } else {
                        actionDiv.style.display = 'none';
                    }
                });

                btnKeluar.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (!isKeluar) {
                        if (confirm(`Yakin menandai siswa "${name}" sebagai KELUAR?\n\nData siswa ini tidak akan muncul lagi di presensi jurnal.`)) {
                            actionDiv.style.display = 'none';
                            handleUpdateStudentStatus(nis, name, 'Keluar', btnKeluar, className, students);
                        }
                    } else {
                        actionDiv.style.display = 'none';
                    }
                });
            }

            studentListContainer.appendChild(card);
        });
    }

    async function handleUpdateStudentStatus(nis, name, newStatus, btnElement, className, studentsList) {
        if (!navigator.onLine) {
            showToast('❌ Tidak ada koneksi internet. Aksi ini membutuhkan koneksi aktif.', 'error');
            return;
        }

        const originalText = btnElement.innerText;
        btnElement.innerText = 'Menyimpan...';
        btnElement.disabled = true;
        btnElement.style.opacity = '0.7';

        try {
            const payload = {
                type: 'UPDATE_STATUS_SISWA',
                NIS: nis,
                NEW_STATUS: newStatus
            };

            const endpoint = typeof UPLOAD_API_URL !== 'undefined' ? UPLOAD_API_URL : 'https://script.google.com/macros/s/AKfycbyahPKtTZVEega7h7fe3fK_-UxKAYS-hgVn8VUI6RhBFqBebDSNsz--0XHnyS8VWXYi/exec';
            
            await fetch(endpoint, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
            });

            // Optimistic Update
            const globalStudentIdx = studentsData.findIndex(s => String(s.NIS) === String(nis));
            if (globalStudentIdx !== -1) {
                studentsData[globalStudentIdx].STATUS = newStatus;
            }
            const localStudentIdx = studentsList.findIndex(s => String(s.NIS) === String(nis));
            if (localStudentIdx !== -1) {
                studentsList[localStudentIdx].STATUS = newStatus;
            }

            showToast(`✅ Status ${name} berhasil diubah menjadi ${newStatus}.`, 'success');
            
            // Re-render the class list
            renderStudentList(className, studentsList);

            // Refresh daftar absensi jurnal jika kelas yang sama dipilih
            const selectedKelas = selectKelas ? selectKelas.value : '';
            if (selectedKelas === className) {
                renderStudentAttendanceList(className);
            }

        } catch (error) {
            console.error('Update Status Error:', error);
            showToast('❌ Gagal memperbarui status. Coba lagi.', 'error');
        } finally {
            btnElement.innerText = originalText;
            btnElement.disabled = false;
            btnElement.style.opacity = '1';
        }
    }


    function showJournalDetail(j) {
        modalJournalTitle.innerText = `Detail Jurnal - ${j.KELAS || ''}`;

        const getFileId = (obj) => {
            const rawIdDrive = obj.FILE_ID_DRIVE || obj.FILE_ID || '';
            if (rawIdDrive && rawIdDrive !== "NOT FOUND" && !rawIdDrive.includes('LOCAL_CACHE')) return rawIdDrive.trim();
            const rawDok = obj.DOKUMENTASI || obj.FILE || '';
            if (!rawDok || rawDok.startsWith('data:image')) return '';
            const idMatch = rawDok.match(/[-\w]{25,}/);
            return idMatch ? idMatch[0] : '';
        };

        const fileId = getFileId(j);
        const thumbUrl = j.IS_CACHED ? j.DOKUMENTASI : (fileId ? `https://lh3.googleusercontent.com/d/${fileId}=w600` : null);
        const fallbackUrl = (!j.IS_CACHED && fileId) ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w600` : null;

        const countNames = (str) => {
            if (!str) return 0;
            return str.split(',').map(n => n.trim()).filter(n => n).length;
        };

        const cA = countNames(j.SISWA_ALPHA || j.ALPHA);
        const cI = countNames(j.SISWA_IZIN || j.IZIN);
        const cS = countNames(j.SISWA_SAKIT || j.SAKIT);

        let bodyHtml = `
            ${thumbUrl ? `
                <div class="modal-thumbnail" style="margin-bottom:1.5rem; border-radius:12px; overflow:hidden; background:#f1f5f9;">
                    <div class="skeleton" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"></div>
                    <img src="${thumbUrl}" data-fallback="${fallbackUrl}" alt="Dokumentasi" 
                         style="opacity: 0; transition: opacity 0.4s ease; width:100%; display:block;"
                         onload="this.style.opacity='1'; this.previousElementSibling.style.display='none';"
                         onerror="if(this.dataset.fallback && this.src !== this.dataset.fallback) { this.src = this.dataset.fallback; } else { this.parentElement.style.display='none'; }">
                </div>
            ` : ''}

            <div style="margin-bottom: 1.5rem; padding: 1rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
                <div style="font-size: 1rem; font-weight: 800; color: var(--primary); margin-bottom: 0.5rem;">${j.MAPEL || ''}</div>
                <div style="font-size: 0.875rem; line-height: 1.5;"><b>Materi:</b> ${j.MATERI_PEMBELAJARAN || j.MATERI || ''}</div>
                <hr style="margin: 0.75rem 0; border: none; border-top: 1px dashed #cbd5e1;">
                <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.8125rem;">
                    <div style="display: flex;"><span style="min-width: 70px; font-weight: 600; color: var(--text-muted);">Hari</span> <span style="margin-right: 8px;">:</span> <span style="color: var(--text);">${j.HARI || ''}</span></div>
                    <div style="display: flex;"><span style="min-width: 70px; font-weight: 600; color: var(--text-muted);">Tanggal</span> <span style="margin-right: 8px;">:</span> <span style="color: var(--text);">${formatDateIndo(j.TANGGAL)}</span></div>
                    <div style="display: flex;"><span style="min-width: 70px; font-weight: 600; color: var(--text-muted);">Jam Ke</span> <span style="margin-right: 8px;">:</span> <span style="color: var(--text);">${j.JAM_KE || j.JAM || ''}</span></div>
                    <div style="display: flex;"><span style="min-width: 70px; font-weight: 600; color: var(--text-muted);">Ruang</span> <span style="margin-right: 8px;">:</span> <span style="color: var(--text);">${j.RUANG || ''}</span></div>
                </div>
            </div>

            <div style="margin-bottom: 1rem; font-size: 0.875rem; font-weight: 700; color: var(--secondary);">Data Kehadiran:</div>
        `;

        const renderGroup = (title, count, names, colorClass) => {
            if (count === 0) return '';
            const listItems = names.split(',').map(n => n.trim()).filter(n => n);
            const listHtml = `<ol>${listItems.map(name => `<li>${name}</li>`).join('')}</ol>`;
            return `
                <div class="attendance-group">
                    <h5 class="${colorClass}">📍 ${title} (${count})</h5>
                    <div class="name-list">${listHtml}</div>
                </div>
            `;
        };

        bodyHtml += renderGroup('Siswa Alpha', cA, j.SISWA_ALPHA || j.ALPHA || '', 'title-alpha');
        bodyHtml += renderGroup('Siswa Izin', cI, j.SISWA_IZIN || j.IZIN || '', 'title-izin');
        bodyHtml += renderGroup('Siswa Sakit', cS, j.SISWA_SAKIT || j.SAKIT || '', 'title-sakit');

        if (cA === 0 && cI === 0 && cS === 0) {
            bodyHtml += '<div style="text-align:center; padding:1.5rem; background:#ecfdf5; color:#065f46; border-radius:8px; font-size:0.875rem; font-weight:600;">✨ Seluruh siswa hadir (NIHIL)</div>';
        }

        modalJournalBody.innerHTML = bodyHtml;

        window.currentViewingJournal = j;
        journalModal.classList.remove('hidden');
        setTimeout(() => journalModal.classList.add('active'), 10);
    }

    editJournalBtn.addEventListener('click', () => {
        if (window.currentViewingJournal) {
            journalModal.classList.remove('active');
            setTimeout(() => journalModal.classList.add('hidden'), 300);
            initJournalForm(window.currentViewingJournal);
            switchScreen('rekap-screen', 'journal-form-screen'); // Assuming we came from rekap
        }
    });

    closeJournalModal.addEventListener('click', () => {
        journalModal.classList.remove('active');
        setTimeout(() => journalModal.classList.add('hidden'), 300);
    });

    menuIsiJurnal.addEventListener('click', () => {
        if (typeof window.refreshBackgroundData === 'function') window.refreshBackgroundData();
        isEditMode = false;
        currentEditingId = null;
        initJournalForm();
        switchScreen('dashboard-screen', 'journal-form-screen');
    });

    if (menuTeacherProfile) {
        menuTeacherProfile.addEventListener('click', () => {
            profileDropdown.classList.remove('active');
            showTeacherProfile();
            switchScreen('dashboard-screen', 'teacher-profile-screen');
        });
    }

    if (backFromProfile) {
        backFromProfile.addEventListener('click', () => {
            switchScreen('teacher-profile-screen', 'dashboard-screen');
        });
    }

    if (btnChangePasswordProfile) {
        btnChangePasswordProfile.addEventListener('click', () => {
            switchScreen('teacher-profile-screen', 'change-password-screen');
        });
    }

    function showTeacherProfile() {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const name = userData.NAMA || 'Teacher Name';
        const nip = userData.NIP || userData.KODEGURU || '-';
        const kode = userData.KODEGURU || userData.KODE || '-';

        profileDetailName.innerText = name;
        profileDetailNip.innerText = nip;
        profileDetailKode.innerText = kode;

        updateAllAvatars();
    }

    function updateAllAvatars() {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const savedPhoto = localStorage.getItem(`profile_photo_${userData.NIP || userData.KODEGURU}`);

        const avatarElements = [avatarBtn, profileDetailAvatar];

        avatarElements.forEach(el => {
            if (!el) return;
            if (savedPhoto) {
                el.innerHTML = `<img src="${savedPhoto}" style="width:100%; height:100%; object-fit:cover;">`;
            } else {
                const name = userData.NAMA || 'User';
                const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                el.innerText = initials;
            }
        });
    }

    // Call this on init to show avatar in dashboard
    updateAllAvatars();

    if (btnEditAvatar) {
        btnEditAvatar.addEventListener('click', () => {
            avatarPickerModal.classList.remove('hidden');
            setTimeout(() => avatarPickerModal.classList.add('active'), 10);
        });
    }

    if (btnCloseAvatarPicker) {
        btnCloseAvatarPicker.addEventListener('click', () => {
            avatarPickerModal.classList.remove('active');
            setTimeout(() => avatarPickerModal.classList.add('hidden'), 300);
        });
    }

    if (btnAvatarGallery) {
        btnAvatarGallery.addEventListener('click', () => {
            inputAvatarGallery.click();
            avatarPickerModal.classList.remove('active');
            setTimeout(() => avatarPickerModal.classList.add('hidden'), 300);
        });
    }

    if (inputAvatarGallery) {
        inputAvatarGallery.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        const MAX_WIDTH = 600;
                        let width = img.width;
                        let height = img.height;

                        if (width > MAX_WIDTH) {
                            height = Math.round((height * MAX_WIDTH) / width);
                            width = MAX_WIDTH;
                        }

                        const canvas = document.createElement('canvas');
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);

                        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);

                        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                        localStorage.setItem(`profile_photo_${userData.NIP || userData.KODEGURU}`, compressedBase64);
                        updateAllAvatars();
                        showToast('✅ Foto profil diperbarui dari galeri.', 'success');

                        // Sync to Google Sheets
                        syncProfilePhoto(compressedBase64);
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (btnAvatarCamera) {
        btnAvatarCamera.addEventListener('click', () => {
            currentCameraTarget = 'avatar';
            avatarPickerModal.classList.remove('active');
            setTimeout(() => avatarPickerModal.classList.add('hidden'), 300);
            startCamera();
        });
    }

    // Dark Mode Persistence & Logic
    const savedDarkMode = localStorage.getItem('dark_mode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
    }

    if (toggleDarkMode) {
        toggleDarkMode.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('dark_mode', isDark);

            // Update mobile status bar color
            const themeMeta = document.querySelector('meta[name="theme-color"]');
            if (themeMeta) {
                themeMeta.setAttribute('content', isDark ? '#0f172a' : '#6366f1');
            }

            showToast(isDark ? '🌙 Mode Gelap aktif' : '☀️ Mode Terang aktif', 'info');
        });
    }

    // Initial theme check for meta
    const initialIsDark = document.body.classList.contains('dark-mode');
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
        themeMeta.setAttribute('content', initialIsDark ? '#0f172a' : '#6366f1');
    }

    if (menuLiterasi) {
        menuLiterasi.addEventListener('click', () => {
            if (typeof window.refreshBackgroundData === 'function') window.refreshBackgroundData();
            renderLiterasiRekapList();
            switchScreen('dashboard-screen', 'literasi-rekap-screen');
        });
    }

    if (backFromLiterasiRekap) {
        backFromLiterasiRekap.addEventListener('click', () => {
            switchScreen('literasi-rekap-screen', 'dashboard-screen');
        });
    }

    if (btnAddLiterasi) {
        btnAddLiterasi.addEventListener('click', () => {
            literasiEntryForm.reset();
            literasiCapturedPhotoData = null;
            literasiCapturedImg.style.display = 'none';
            literasiPhotoPlaceholder.style.display = 'block';
            retakePhotoLiterasi.style.display = 'none';
            initLiterasiForm();
            switchScreen('literasi-rekap-screen', 'literasi-form-screen');
        });
    }

    if (backFromLiterasiForm) {
        backFromLiterasiForm.addEventListener('click', () => {
            switchScreen('literasi-form-screen', 'literasi-rekap-screen');
        });
    }

    function renderLiterasiRekapList() {
        if (!literasiRekapContainer) return;

        try {
            literasiRekapContainer.innerHTML = '';

            const savedUser = JSON.parse(localStorage.getItem('userData') || '{}');
            const userNama = String(savedUser.NAMA || '').toUpperCase().trim();

            const cached = JSON.parse(localStorage.getItem('cached_literasi') || '[]').map(l => ({ ...l, IS_CACHED: true }));

            const server = (literasiData || []).filter(l => {
                const dbNama = String(getVal(l, ['NAMA', 'GURU']) || '').toUpperCase().trim();
                return userNama && dbNama.includes(userNama);
            });

            const normalizeDate = (s) => {
                if (!s || typeof s !== 'string') return '';
                if (s.includes('-')) return s;
                if (s.includes('/')) {
                    const [d, m, y] = s.split('/');
                    return `${y}-${(m || '').padStart(2, '0')}-${(d || '').padStart(2, '0')}`;
                }
                return s;
            };

            const combined = [...server];
            cached.forEach(c => {
                const cDate = normalizeDate(c.TANGGAL);
                const exists = combined.find(s =>
                    normalizeDate(s.TANGGAL) === cDate &&
                    s.KELAS === c.KELAS &&
                    (s.RUANG || '') === (c.RUANG || '')
                );
                if (!exists) combined.push(c);
            });

            combined.sort((a, b) => {
                const parse = (s) => {
                    if (!s || typeof s !== 'string') return 0;
                    if (s.includes('-')) return new Date(s).getTime();
                    if (s.includes('/')) {
                        const [d, m, y] = s.split('/');
                        return new Date(`${y}-${(m || '').padStart(2, '0')}-${(d || '').padStart(2, '0')}`).getTime();
                    }
                    return 0;
                };
                return (parse(b.TANGGAL) || 0) - (parse(a.TANGGAL) || 0);
            });

            if (combined.length === 0) {
                literasiRekapContainer.innerHTML = `
                    <div style="text-align:center; padding:4rem 1rem; color:var(--text-muted);">
                        <div style="font-size:3rem; margin-bottom:1rem; opacity:0.2;">📖</div>
                        <p>Belum ada riwayat literasi.<br>Tekan <b>+</b> untuk menambahkan.</p>
                    </div>`;
                return;
            }

            combined.forEach((l, idx) => {
                const getFileId = (obj) => {
                    const rawId = obj.FILE_ID_DRIVE || obj.FILE_ID || '';
                    if (rawId && rawId !== 'NOT FOUND' && !rawId.includes('LOCAL_CACHE')) return rawId.trim();
                    const rawDok = getVal(obj, ['FOTO', 'DOKUMENTASI']) || '';
                    if (!rawDok || rawDok.startsWith('data:image')) return '';
                    const m = rawDok.match(/[-\w]{25,}/);
                    return m ? m[0] : '';
                };

                const fileId = getFileId(l);
                const thumbUrl = l.IS_CACHED
                    ? (getVal(l, ['FOTO', 'DOKUMENTASI']) || null)
                    : (fileId ? `https://lh3.googleusercontent.com/d/${fileId}=w600` : null);
                const fallbackUrl = (!l.IS_CACHED && fileId) ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w600` : null;

                const card = document.createElement('div');
                card.className = 'rekap-card';
                card.style.animationDelay = `${idx * 0.05}s`;

                const cardNama = getVal(l, ['NAMA', 'GURU']) || userNama;
                const cardHari = getVal(l, ['HARI']) || '';
                const cardTanggal = l.TANGGAL || '';
                const cardKelas = getVal(l, ['KELAS']) || '';
                const cardRuang = getVal(l, ['RUANG']) || '';
                const cardKegiatan = getVal(l, ['KEGIATAN', 'LITERASI']) || '';

                card.innerHTML = `
                    <div class="post-header">
                        <div class="post-avatar">📖</div>
                        <div class="post-user-info">
                            <h5>${cardNama} ${l.IS_CACHED ? '<span class="cache-badge">CACHE</span>' : ''}</h5>
                            <p>${cardHari}${cardHari ? ', ' : ''}${formatDateIndo(cardTanggal)} • ${cardKelas}</p>
                        </div>
                    </div>
                    <div class="post-content">
                        <h4 style="color:var(--primary); font-weight:800; margin-bottom:0.25rem;">${cardRuang}</h4>
                        <p style="font-size:0.875rem; color:var(--text);">${cardKegiatan}</p>
                    </div>
                    ${thumbUrl ? `
                    <div class="rekap-thumbnail" style="position:relative; border-radius:12px; overflow:hidden; margin-top:1rem; background:#f1f5f9;">
                        <div class="skeleton" style="position:absolute;top:0;left:0;right:0;bottom:0;"></div>
                        <img src="${thumbUrl}" data-fallback="${fallbackUrl || ''}" alt="Dokumentasi"
                             style="opacity:0; transition:opacity 0.4s ease; width:100%; display:block;"
                             onload="this.style.opacity='1'; this.previousElementSibling.style.display='none';"
                             onerror="if(this.dataset.fallback){ this.src=this.dataset.fallback; this.dataset.fallback=''; }">
                    </div>` : ''}
                `;
                literasiRekapContainer.appendChild(card);
            });
        } catch (err) {
            console.error('Error rendering Literasi Rekap:', err);
            literasiRekapContainer.innerHTML = `
                <div style="text-align:center; padding:2rem; color:#ef4444;">
                    <p>Terjadi kesalahan saat memuat data: ${err.message}</p>
                </div>
            `;
        }
    }

    function initLiterasiForm() {
        const now = new Date();
        const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
        const dayName = days[now.getDay()];
        const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
        literasiTanggalDisplay.innerText = `${dayName}, ${dateStr}`;

        selectLiterasiKelas.innerHTML = '<option value="">-- Pilih Kelas --</option>';
        const uniqueClasses = [...new Set(studentsData.map(s => s.KELAS).filter(c => c))].sort();
        uniqueClasses.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c;
            opt.innerText = c;
            selectLiterasiKelas.appendChild(opt);
        });

        // Populate Ruang
        selectLiterasiRuang.innerHTML = '<option value="">-- Pilih Ruang --</option>';
        const uniqueRooms = [...new Set(roomsData.map(r => r.NAMA_RUANG || r.RUANG).filter(r => r))].sort();
        uniqueRooms.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r;
            opt.innerText = r;
            selectLiterasiRuang.appendChild(opt);
        });
    }

    if (menuPiket) {
        menuPiket.addEventListener('click', () => {
            if (typeof window.refreshBackgroundData === 'function') window.refreshBackgroundData();
            piketEntryForm.reset();
            initPiketForm();
            switchScreen('dashboard-screen', 'piket-form-screen');
        });
    }

    if (backFromPiketForm) {
        backFromPiketForm.addEventListener('click', () => {
            switchScreen('piket-form-screen', 'dashboard-screen');
        });
    }

    function initPiketForm() {
        // Set Date & Day
        const now = new Date();
        const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
        const dayName = days[now.getDay()];
        const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
        if (piketTanggalDisplay) piketTanggalDisplay.innerText = `${dayName}, ${dateStr}`;

        // Populate Jam Piket (1-11)
        if (selectPiketJam) {
            selectPiketJam.innerHTML = '<option value="">-- Pilih Jam --</option>';
            for (let i = 1; i <= 11; i++) {
                const opt = document.createElement('option');
                opt.value = i;
                opt.innerText = `Jam ke-${i}`;
                selectPiketJam.appendChild(opt);
            }
        }

        // Populate Guru Absent
        if (selectPiketGuruAbsent) {
            selectPiketGuruAbsent.innerHTML = '<option value="">-- Pilih Guru --</option>';
            const sortedGurus = [...usersData].sort((a, b) => (a.NAMA || '').localeCompare(b.NAMA || ''));
            sortedGurus.forEach(g => {
                const opt = document.createElement('option');
                opt.value = g.NAMA;
                opt.innerText = g.NAMA;
                selectPiketGuruAbsent.appendChild(opt);
            });
        }

        // Populate Kelas
        if (selectPiketKelas) {
            selectPiketKelas.innerHTML = '<option value="">-- Pilih Kelas --</option>';
            const uniqueClasses = [...new Set(studentsData.map(s => s.KELAS).filter(c => c))].sort();
            uniqueClasses.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c;
                opt.innerText = c;
                selectPiketKelas.appendChild(opt);
            });
        }
    }

    if (menuCalendar) {
        menuCalendar.addEventListener('click', () => {
            switchScreen('dashboard-screen', 'calendar-screen');
        });
    }

    if (backFromCalendar) {
        backFromCalendar.addEventListener('click', () => {
            switchScreen('calendar-screen', 'dashboard-screen');
        });
    }

    async function fetchCalendarData() {
        const icsUrl = 'https://calendar.google.com/calendar/ical/humassmknesbu%40gmail.com/public/basic.ics';

        // Proxy fallbacks - using more reliable ones first
        const proxies = [
            `https://corsproxy.io/?${encodeURIComponent(icsUrl)}`,
            `https://thingproxy.freeboard.io/fetch/${icsUrl}`,
            `https://api.allorigins.win/get?url=${encodeURIComponent(icsUrl)}&ts=${Date.now()}`,
            `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(icsUrl)}`
        ];

        for (const proxy of proxies) {
            try {
                const response = await fetch(proxy);
                if (!response.ok) continue;

                let content = '';
                if (proxy.includes('allorigins')) {
                    const data = await response.json();
                    content = data.contents;
                    if (content && content.includes('base64,')) {
                        content = window.atob(content.split('base64,')[1]);
                    }
                } else {
                    content = await response.text();
                }

                if (content && content.includes('BEGIN:VCALENDAR')) {
                    allCalendarEvents = parseICS(content);
                    localStorage.setItem('last_calendar_data', content);

                    // Update UI immediately if we found new data
                    const listElem = document.getElementById('today-agenda-list');
                    if (listElem) {
                        const today = new Date();
                        const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
                        const todayEvents = allCalendarEvents.filter(e => {
                            const eDate = new Date(e.date);
                            return `${eDate.getFullYear()}-${eDate.getMonth() + 1}-${eDate.getDate()}` === todayStr;
                        });

                        if (todayEvents.length > 0) {
                            updateDashboardAgenda();
                        }
                    }
                    return allCalendarEvents;
                }
            } catch (e) {
                console.warn('Proxy failed:', proxy, e);
            }
        }
        return [];
    }

    function parseICS(icsData) {
        const events = [];
        const normalizedData = icsData.replace(/\r\n\s/g, '').replace(/\n\s/g, '');
        const eventBlocks = normalizedData.split('BEGIN:VEVENT');

        for (let i = 1; i < eventBlocks.length; i++) {
            const block = eventBlocks[i];

            let summaryMatch = block.match(/SUMMARY:(.*?)(\r|\n|$)/);
            let summary = summaryMatch ? summaryMatch[1].trim() : 'Tanpa Judul';
            summary = summary.replace(/\\,/g, ',').replace(/\\;/g, ';');

            const dtstartMatch = block.match(/DTSTART(?:;[^:]*)?:(\d{8})(T\d{6}Z?)?/);
            if (dtstartMatch) {
                const dtstart = dtstartMatch[1];
                const year = parseInt(dtstart.substring(0, 4));
                const month = parseInt(dtstart.substring(4, 6));
                const day = parseInt(dtstart.substring(6, 8));

                // Create date in LOCAL time to match new Date()
                const date = new Date(year, month - 1, day);

                let descMatch = block.match(/DESCRIPTION:(.*?)(\r\n[A-Z-]*[:;]|$)/s);
                let description = descMatch ? descMatch[1].trim() : '';
                description = description.replace(/\\n/g, ' ').replace(/\\,/g, ',').replace(/\\;/g, ';').trim();

                events.push({ title: summary, date: date, description: description });
            }
        }
        return events.sort((a, b) => a.date - b.date);
    }

    backFromJurnalForm.addEventListener('click', () => {
        if (cameraStream) stopCamera();
        switchScreen('journal-form-screen', 'dashboard-screen');
    });

    function formatIndonesianDate(isoString) {
        const date = new Date(isoString);
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        const day = date.getDate().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    jamDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        jamChecklistContainer.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        jamChecklistContainer.classList.remove('active');
    });

    jamChecklistContainer.addEventListener('click', (e) => e.stopPropagation());

    function updateSelectedJamText() {
        const checked = Array.from(jamChecklistContainer.querySelectorAll('input:checked')).map(i => i.value);
        if (checked.length === 0) {
            selectedJamText.innerText = 'Pilih Jam...';
        } else {
            selectedJamText.innerText = `Jam: ${checked.join(', ')}`;
        }
    }

    function initJournalForm(editData = null) {
        journalEntryForm.reset();
        studentAttendanceList.innerHTML = '';
        totalSiswaVal.innerText = '0';
        hadirSiswaVal.innerText = '0';
        selectedJamText.innerText = 'Pilih Jam...';

        capturedPhotoData = null;
        capturedPhotoImg.style.display = 'none';
        photoPlaceholderText.style.display = 'block';
        retakePhotoBtn.style.display = 'none';

        isEditMode = !!editData;
        currentEditingId = editData ? (editData.ID || (editData.TANGGAL || '') + (editData.JAM_KE || editData.JAM || '')) : null;

        // Helper to convert GViz dates or DD/MM/YYYY to YYYY-MM-DD
        const toISODate = (dateStr) => {
            if (!dateStr) return '';
            if (dateStr.includes('Date(')) {
                const parts = dateStr.match(/\d+/g);
                if (parts && parts.length >= 3) {
                    const year = parts[0];
                    const month = String(parseInt(parts[1]) + 1).padStart(2, '0');
                    const day = String(parts[2]).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                }
            }
            if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
            if (dateStr.includes('/')) {
                const parts = dateStr.split('/');
                if (parts.length === 3 && parts[2].length === 4) {
                    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                }
            }
            return dateStr;
        };

        if (isEditMode && editData) {
            originalJournalKeys = {
                TANGGAL: toISODate(editData.TANGGAL || editData.Tanggal || ''),
                JAM_KE: editData.JAM_KE || editData.JAM || editData.Jam || '',
                KELAS: editData.KELAS || editData.Kelas || editData.kelas || ''
            };
        } else {
            originalJournalKeys = null;
        }

        jamChecklistContainer.innerHTML = '';
        const savedJams = editData ? (editData.JAM_KE || editData.JAM || '').split(',').map(j => j.trim()) : [];

        for (let i = 1; i <= 11; i++) {
            const item = document.createElement('div');
            item.className = 'checklist-item';
            const isChecked = savedJams.includes(i.toString());
            if (isChecked) item.classList.add('selected');

            item.innerHTML = `
                <input type="checkbox" value="${i}" id="jam-${i}" ${isChecked ? 'checked' : ''}>
                <label for="jam-${i}" style="flex-grow:1; cursor:pointer;">Jam Pelajaran ${i}</label>
            `;
            item.querySelector('input').addEventListener('change', (e) => {
                item.classList.toggle('selected', e.target.checked);
                updateSelectedJamText();
            });

            item.addEventListener('click', (e) => {
                if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'LABEL') {
                    const cb = item.querySelector('input');
                    cb.checked = !cb.checked;
                    cb.dispatchEvent(new Event('change'));
                }
            });
            jamChecklistContainer.appendChild(item);
        }
        updateSelectedJamText();

        inputRuang.innerHTML = '<option value="">Pilih Ruang</option>';
        const uniqueRooms = [...new Set(roomsData.map(r => r.NAMA_RUANG || r.RUANG).filter(r => r))].sort();
        uniqueRooms.forEach(r => {
            const optElem = document.createElement('option');
            optElem.value = r;
            optElem.innerText = r;
            inputRuang.appendChild(optElem);
        });

        if (editData) {
            const isoDate = toISODate(editData.TANGGAL);
            inputTanggalRaw.value = isoDate;
            inputTanggalDisplay.innerText = formatIndonesianDate(isoDate);

            selectMapel.innerHTML = `<option value="${editData.MAPEL}">${editData.MAPEL}</option>`;
            subjectsData.forEach(s => {
                const name = s.NAMA_MAPEL || s.MAPEL;
                if (name !== editData.MAPEL) {
                    const opt = document.createElement('option');
                    opt.value = name;
                    opt.innerText = name;
                    selectMapel.appendChild(opt);
                }
            });

            selectKelas.innerHTML = `<option value="${editData.KELAS}">${editData.KELAS}</option>`;
            selectKelas.disabled = true;

            inputRuang.value = editData.RUANG || '';
            inputMateri.value = editData.MATERI_PEMBELAJARAN || editData.MATERI || '';

            if (editData.DOKUMENTASI) {
                capturedPhotoData = editData.DOKUMENTASI;
                let displayUrl = editData.DOKUMENTASI;

                // Convert Drive URL to direct image URL to avoid loading issues
                if (!displayUrl.startsWith('data:image')) {
                    const rawIdDrive = editData.FILE_ID_DRIVE || editData.FILE_ID || '';
                    let fileId = (rawIdDrive && rawIdDrive !== "NOT FOUND" && !rawIdDrive.includes('LOCAL_CACHE')) ? rawIdDrive.trim() : '';
                    if (!fileId) {
                        const idMatch = displayUrl.match(/[-\w]{25,}/);
                        if (idMatch) fileId = idMatch[0];
                    }
                    if (fileId) displayUrl = `https://lh3.googleusercontent.com/d/${fileId}=w600`;
                }

                capturedPhotoImg.src = displayUrl;
                capturedPhotoImg.style.display = 'block';
                photoPlaceholderText.style.display = 'none';
                retakePhotoBtn.style.display = 'block';
            }

            renderStudentAttendanceList(editData.KELAS, editData);
            journalEntryForm.querySelector('button[type="submit"]').innerText = 'Update Jurnal';
        } else {
            selectKelas.disabled = false;
            journalEntryForm.querySelector('button[type="submit"]').innerText = 'Simpan Jurnal';

            const now = new Date();
            const offset = 7 * 60;
            const localTime = new Date(now.getTime() + (now.getTimezoneOffset() + offset) * 60000);
            const isoDate = localTime.toISOString().split('T')[0];

            inputTanggalRaw.value = isoDate;
            inputTanggalDisplay.innerText = formatIndonesianDate(isoDate);

            selectMapel.innerHTML = '<option value="">Pilih Mata Pelajaran</option>';

            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            const userName = (userData.NAMA || '').toUpperCase().trim();
            const userKode = (userData.KODEGURU || userData['KODE GURU'] || '').toUpperCase().trim();

            // Filter subjects that belong to this teacher (supports comma-separated codes/names)
            const teacherSubjects = subjectsData.filter(s => {
                const sGuruRaw = (getVal(s, ['NAMA_GURU', 'GURU', 'NAMA']) || '').toUpperCase();
                const sKodeRaw = (getVal(s, ['KODEGURU', 'KODE_GURU', 'KODE']) || '').toUpperCase();

                // Split by comma and trim each value for clean matching
                const gurus = sGuruRaw.split(',').map(n => n.trim());
                const kodes = sKodeRaw.split(',').map(k => k.trim());

                return (userName && gurus.includes(userName)) || (userKode && kodes.includes(userKode));
            });

            // Use filtered subjects, or fallback to all if none found (to prevent empty list)
            const sourceData = teacherSubjects.length > 0 ? teacherSubjects : subjectsData;
            const uniqueMapels = [...new Set(sourceData.map(s => s.NAMA_MAPEL || s.MAPEL).filter(m => m))].sort();

            uniqueMapels.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m;
                opt.innerText = m;
                selectMapel.appendChild(opt);
            });

            selectKelas.innerHTML = '<option value="">Pilih Kelas</option>';
            const uniqueClasses = [...new Set(studentsData.map(s => s.KELAS).filter(c => c))].sort();
            uniqueClasses.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c;
                opt.innerText = c;
                selectKelas.appendChild(opt);
            });

            studentAttendanceList.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-muted); font-size: 0.875rem;">Pilih kelas untuk memuat daftar siswa.</p>';
        }
    }

    function updateCameraTransform() {
        if (!cameraFeed) return;
        let scaleX = currentZoom;
        let scaleY = currentZoom;
        if (isMirrored) {
            scaleX = -currentZoom;
        }
        cameraFeed.style.transform = `scale(${scaleX}, ${scaleY})`;
        cameraFeed.style.transformOrigin = 'center center';
    }

    async function startCamera() {
        const activeScreen = document.querySelector('.screen.active');
        if (!activeScreen) return;

        // Check if browser supports mediaDevices
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            showAlert('📷 Kamera Gagal', 'Browser Anda tidak mendukung akses kamera atau Anda tidak menggunakan koneksi HTTPS.', 'error');
            return;
        }

        try {
            if (cameraStream) stopCamera();

            // Set mirror mode default based on camera facing mode
            isMirrored = (currentFacingMode === 'user');

            // Reset zoom to 1x
            currentZoom = 1;
            if (cameraZoomSlider) {
                cameraZoomSlider.value = 1;
                cameraZoomVal.innerText = '1.0x';
            }
            updateCameraTransform();

            let constraints = {
                video: {
                    facingMode: { ideal: currentFacingMode },
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };

            try {
                cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
            } catch (initialErr) {
                console.warn('Initial camera constraints failed, trying fallback...', initialErr);
                // Fallback: Just ask for any video
                constraints = { video: true };
                cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
            }

            cameraFeed.srcObject = cameraStream;

            cameraModal.classList.remove('hidden');
            setTimeout(() => {
                cameraModal.classList.add('active');
                cameraFeed.play().then(() => {
                    initZoomCapabilities();
                    updateCameraTransform();
                }).catch(e => console.error("Play failed:", e));
            }, 50);
        } catch (err) {
            console.error('Camera Error:', err);
            let errorMsg = 'Tidak dapat mengakses kamera. Pastikan Anda memberikan izin akses kamera.';
            if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
                errorMsg = 'Akses kamera hanya diperbolehkan melalui koneksi aman (HTTPS).';
            }
            showAlert('📷 Kamera Gagal', errorMsg, 'error');
        }
    }

    function stopCamera() {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
        }
        cameraModal.classList.remove('active');
        setTimeout(() => cameraModal.classList.add('hidden'), 300);
    }

    function initZoomCapabilities() {
        if (!cameraStream) return;
        const track = cameraStream.getVideoTracks()[0];
        if (track) {
            const capabilities = typeof track.getCapabilities === 'function' ? track.getCapabilities() : {};
            if (capabilities.zoom) {
                cameraZoomSlider.min = capabilities.zoom.min || 1;
                cameraZoomSlider.max = capabilities.zoom.max || 4;
                cameraZoomSlider.step = capabilities.zoom.step || 0.1;
                cameraZoomSlider.value = currentZoom;
            } else {
                cameraZoomSlider.min = 1;
                cameraZoomSlider.max = 4;
                cameraZoomSlider.step = 0.1;
                cameraZoomSlider.value = currentZoom;
            }
        }
    }

    function applyZoom(zoomValue) {
        if (!cameraStream) return;
        const track = cameraStream.getVideoTracks()[0];
        if (track) {
            const capabilities = typeof track.getCapabilities === 'function' ? track.getCapabilities() : {};
            if (capabilities.zoom) {
                track.applyConstraints({
                    advanced: [{ zoom: zoomValue }]
                }).catch(err => {
                    console.warn("Native zoom constraint failed, fallback to CSS scale:", err);
                    updateCameraTransform();
                });
            } else {
                updateCameraTransform();
            }
        }
    }

    async function switchCamera() {
        if (!cameraStream) return;
        currentFacingMode = (currentFacingMode === 'environment' ? 'user' : 'environment');
        
        // Auto-toggle mirror mode depending on the active camera mode
        isMirrored = (currentFacingMode === 'user');

        // Reset zoom
        currentZoom = 1;
        if (cameraZoomSlider) {
            cameraZoomSlider.value = 1;
            cameraZoomVal.innerText = '1.0x';
        }
        updateCameraTransform();

        // Stop current tracks
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;

        let constraints = {
            video: {
                facingMode: { ideal: currentFacingMode },
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        };

        try {
            cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
            cameraFeed.srcObject = cameraStream;
            await cameraFeed.play();
            initZoomCapabilities();
            updateCameraTransform();
        } catch (err) {
            console.warn('Switch camera failed, trying fallback:', err);
            try {
                constraints = { video: { facingMode: currentFacingMode } };
                cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
                cameraFeed.srcObject = cameraStream;
                await cameraFeed.play();
                initZoomCapabilities();
                updateCameraTransform();
            } catch (fallbackErr) {
                console.error('Switch camera fallback failed:', fallbackErr);
                showToast('Kamera tidak tersedia.', 'error');
            }
        }
    }

    if (cameraZoomSlider) {
        cameraZoomSlider.addEventListener('input', (e) => {
            currentZoom = parseFloat(e.target.value);
            if (cameraZoomVal) {
                cameraZoomVal.innerText = currentZoom.toFixed(1) + 'x';
            }
            applyZoom(currentZoom);
        });
    }

    if (switchCameraBtn) {
        switchCameraBtn.addEventListener('click', switchCamera);
    }

    if (mirrorCameraBtn) {
        mirrorCameraBtn.addEventListener('click', () => {
            isMirrored = !isMirrored;
            updateCameraTransform();
            showToast(isMirrored ? 'Mode cermin aktif (Mirror ON)' : 'Mode cermin nonaktif (Mirror OFF)', 'info');
        });
    }

    if (openCameraBtn) {
        openCameraBtn.addEventListener('click', () => {
            currentCameraTarget = 'journal';
            startCamera();
        });
    }

    if (openCameraLiterasi) {
        openCameraLiterasi.addEventListener('click', () => {
            currentCameraTarget = 'literasi';
            startCamera();
        });
    }

    if (retakePhotoLiterasi) {
        retakePhotoLiterasi.addEventListener('click', () => {
            currentCameraTarget = 'literasi';
            startCamera();
        });
    }

    closeCameraModal.addEventListener('click', stopCamera);
    retakePhotoBtn.addEventListener('click', () => {
        currentCameraTarget = 'journal';
        startCamera();
    });

    captureBtn.addEventListener('click', () => {
        const MAX_WIDTH = 800;
        let width = cameraFeed.videoWidth;
        let height = cameraFeed.videoHeight;

        if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
        }

        cameraCanvas.width = width;
        cameraCanvas.height = height;
        const ctx = cameraCanvas.getContext('2d');

        // Apply mirroring to captured image if mode is mirrored
        if (isMirrored) {
            ctx.translate(width, 0);
            ctx.scale(-1, 1);
        }

        // Check if native hardware zoom was used
        let isHardwareZoom = false;
        if (cameraStream) {
            const track = cameraStream.getVideoTracks()[0];
            if (track) {
                const capabilities = typeof track.getCapabilities === 'function' ? track.getCapabilities() : {};
                if (capabilities.zoom) {
                    isHardwareZoom = true;
                }
            }
        }

        if (isHardwareZoom || currentZoom === 1) {
            ctx.drawImage(cameraFeed, 0, 0, width, height);
        } else {
            // Digital zoom crop fallback
            const sWidth = cameraFeed.videoWidth / currentZoom;
            const sHeight = cameraFeed.videoHeight / currentZoom;
            const sx = (cameraFeed.videoWidth - sWidth) / 2;
            const sy = (cameraFeed.videoHeight - sHeight) / 2;
            ctx.drawImage(cameraFeed, sx, sy, sWidth, sHeight, 0, 0, width, height);
        }

        // Reset context transform to prevent bugs in subsequent draws
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Kompresi kualitas 60% dan resize max 800px
        const photoData = cameraCanvas.toDataURL('image/jpeg', 0.6);

        if (currentCameraTarget === 'journal') {
            capturedPhotoData = photoData;
            capturedPhotoImg.src = capturedPhotoData;
            capturedPhotoImg.style.display = 'block';
            photoPlaceholderText.style.display = 'none';
            retakePhotoBtn.style.display = 'block';
        } else if (currentCameraTarget === 'literasi') {
            literasiCapturedPhotoData = photoData;
            literasiCapturedImg.src = literasiCapturedPhotoData;
            literasiCapturedImg.style.display = 'block';
            literasiPhotoPlaceholder.style.display = 'none';
            retakePhotoLiterasi.style.display = 'block';
        } else if (currentCameraTarget === 'izin') {
            izinCapturedPhotoData = photoData;
            izinCapturedImg.src = izinCapturedPhotoData;
            izinCapturedImg.style.display = 'block';
            retakePhotoIzin.style.display = 'block';
        } else if (currentCameraTarget === 'avatar') {
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            localStorage.setItem(`profile_photo_${userData.NIP || userData.KODEGURU}`, photoData);
            updateAllAvatars();
            showToast('✅ Foto profil diperbarui dari kamera.', 'success');

            // Sync to Google Sheets
            syncProfilePhoto(photoData);
        }

        stopCamera();
    });

    selectKelas.addEventListener('change', () => {
        const kelas = selectKelas.value;
        if (kelas) {
            if (navigator.onLine && typeof window.loadSheet === 'function') {
                // Proactively pull the latest permit and students data from server on class change
                window.loadSheet(DATA_SID, 'SISWAIZIN', 'handleIzinResponse');
                pendingStudentAttendanceRefresh = kelas;
                window.loadSheet(DATA_SID, 'DATASISWA', 'handleStudentResponse');
            } else {
                renderStudentAttendanceList(kelas);
            }
        } else {
            studentAttendanceList.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-muted); font-size: 0.875rem;">Pilih kelas untuk memuat daftar siswa.</p>';
            totalSiswaVal.innerText = '0';
            hadirSiswaVal.innerText = '0';
        }
    });

    function renderStudentAttendanceList(kelas, editData = null) {
        const studentsInClass = studentsData.filter(s => {
            if (s.KELAS !== kelas) return false;
            if (!(s.NAMA_PESERTA_DIDIK || s.NAMA || '').trim()) return false;
            // Exclude students with STATUS "Keluar"
            const status = String(s.STATUS || '').trim().toUpperCase();
            return status !== 'KELUAR';
        }).sort((a, b) => {
            const nameA = (a.NAMA_PESERTA_DIDIK || a.NAMA || '').toUpperCase();
            const nameB = (b.NAMA_PESERTA_DIDIK || b.NAMA || '').toUpperCase();
            return nameA.localeCompare(nameB);
        });

        studentAttendanceList.innerHTML = '';
        if (studentsInClass.length === 0) {
            studentAttendanceList.innerHTML = '<p style="text-align:center; padding:2rem; color:var(--text-muted);">Tidak ada data siswa untuk kelas ini.</p>';
            return;
        }

        // Get local izin data for today
        const now = new Date();
        const todayStr = now.toLocaleDateString('en-CA'); // YYYY-MM-DD
        const cachedIzin = JSON.parse(localStorage.getItem('cached_siswa_izin') || '[]');
        const todayIzinForClassLocal = cachedIzin.filter(i => i.TANGGAL === todayStr && i.KELAS === kelas);

        // Get server izin data for today
        let siswaIzinData = window.siswaIzinData || []; // Fallback if not defined globally
        const todayIzinForClassServer = siswaIzinData.filter(i => {
            const dbDate = (i.TANGGAL || '').trim();
            return dbDate.includes(todayStr) && i.KELAS === kelas;
        });

        const allIzinForClass = [...todayIzinForClassServer, ...todayIzinForClassLocal];

        const alpha = (editData?.SISWA_ALPHA || editData?.ALPHA || '').split(',').map(s => s.trim().toUpperCase());
        const izin = (editData?.SISWA_IZIN || editData?.IZIN || '').split(',').map(s => s.trim().toUpperCase());
        const sakit = (editData?.SISWA_SAKIT || editData?.SAKIT || '').split(',').map(s => s.trim().toUpperCase());

        studentsInClass.forEach((s, index) => {
            const name = s.NAMA_PESERTA_DIDIK || s.NAMA;
            const upperName = (name || '').trim().toUpperCase();
            const studentId = `s-${index}`;

            let status = 'H'; // Default Hadir
            let isBkIzin = false;
            let bkKeterangan = '';

            // Priority 1: Edit Data (if editing existing journal)
            if (editData) {
                if (alpha.includes(upperName)) status = 'A';
                else if (izin.includes(upperName)) status = 'I';
                else if (sakit.includes(upperName)) status = 'S';
            }
            // Priority 2: Auto-sync from Siswa Izin for today
            else {
                const izinRecord = allIzinForClass.find(i => (i.NAMA_SISWA || i.NAMA) === name);
                if (izinRecord) {
                    const ket = (izinRecord.KETERANGAN || '').toLowerCase();
                    status = ket.includes('sakit') ? 'S' : 'I';
                    isBkIzin = true;
                    bkKeterangan = izinRecord.KETERANGAN || 'Izin (Guru BK)';
                }
            }

            const row = document.createElement('div');
            row.className = 'attendance-row';

            let nameHtml = `<div class="attendance-name" data-name="${name}">${name}`;
            if (isBkIzin) {
                nameHtml += `<div style="font-size: 0.7rem; color: var(--danger); margin-top: 4px; font-weight: 600;"><i class="fas fa-info-circle"></i> Dicatat BK: ${bkKeterangan}</div>`;
            }
            nameHtml += `</div>`;

            row.innerHTML = `
                ${nameHtml}
                <div class="attendance-options">
                    <input type="radio" name="${studentId}" id="${studentId}-h" value="H" ${status === 'H' ? 'checked' : ''} class="radio-h">
                    <label for="${studentId}-h" title="Hadir">H</label>
                    <input type="radio" name="${studentId}" id="${studentId}-a" value="A" ${status === 'A' ? 'checked' : ''} class="radio-a">
                    <label for="${studentId}-a" title="Alpha">A</label>
                    <input type="radio" name="${studentId}" id="${studentId}-i" value="I" ${status === 'I' ? 'checked' : ''} class="radio-i">
                    <label for="${studentId}-i" title="Izin">I</label>
                    <input type="radio" name="${studentId}" id="${studentId}-s" value="S" ${status === 'S' ? 'checked' : ''} class="radio-s">
                    <label for="${studentId}-s" title="Sakit">S</label>
                </div>
            `;
            row.querySelectorAll('input').forEach(input => {
                input.addEventListener('change', updateAttendanceStats);
            });
            studentAttendanceList.appendChild(row);
        });
        updateAttendanceStats();
    }

    function updateAttendanceStats() {
        const total = studentAttendanceList.querySelectorAll('.attendance-row').length;
        const absentCount = studentAttendanceList.querySelectorAll('input[value]:not([value="H"]):checked').length;
        const hadir = total - absentCount;
        totalSiswaVal.innerText = total;
        hadirSiswaVal.innerText = hadir;
    }

    journalEntryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const allCheckboxes = jamChecklistContainer.querySelectorAll('input[type="checkbox"]');
            const jamChecked = Array.from(allCheckboxes).filter(cb => cb.checked).map(cb => cb.value);

            const mapel = selectMapel ? selectMapel.value : '';
            const kelas = selectKelas ? selectKelas.value : '';
            const ruang = inputRuang ? inputRuang.value : '';
            const materi = inputMateri ? inputMateri.value : '';

            if (jamChecked.length === 0) {
                showToast('Jam Pelajaran belum dipilih!', 'warning');
                jamChecklistContainer.classList.add('active');
                return;
            }
            if (!mapel) { showToast('Mata Pelajaran belum dipilih!', 'warning'); return; }
            if (!kelas) { showToast('Kelas belum dipilih!', 'warning'); return; }
            if (!ruang || ruang.trim() === '') { showToast('Ruang kelas belum diisi!', 'warning'); return; }
            if (!materi || materi.trim() === '') { showToast('Materi pembelajaran belum diisi!', 'warning'); return; }
            if (!capturedPhotoData) {
                showToast('Foto Dokumentasi WAJIB diambil!', 'error');
                openCameraBtn.scrollIntoView({ behavior: 'smooth' });
                return;
            }

            const submitBtn = journalEntryForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = '⌛ Menyimpan...';
            submitBtn.disabled = true;

            const savedUser = JSON.parse(localStorage.getItem('userData') || '{}');
            const dateObj = new Date(inputTanggalRaw.value);
            const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
            const hari = days[dateObj.getDay()];

            const presentList = [], alphaList = [], izinList = [], sakitList = [];
            studentAttendanceList.querySelectorAll('.attendance-row').forEach(row => {
                const nameElem = row.querySelector('.attendance-name');
                const name = nameElem.getAttribute('data-name') || nameElem.innerText.split('\n')[0].trim();
                const status = row.querySelector('input:checked').value;
                if (status === 'H') presentList.push(name);
                else if (status === 'A') alphaList.push(name);
                else if (status === 'I') izinList.push(name);
                else if (status === 'S') sakitList.push(name);
            });

            const formData = {
                ID: isEditMode ? (currentEditingId || 'CACHE-' + Date.now()) : 'CACHE-' + Date.now(),
                TANGGAL: inputTanggalRaw.value,
                HARI: hari,
                JAM_KE: jamChecked.join(', '),
                NAMA_GURU: savedUser.NAMA || 'User',
                KELAS: kelas,
                RUANG: ruang,
                JUMLAH_SISWA: presentList.length + alphaList.length + izinList.length + sakitList.length,
                MAPEL: mapel,
                MATERI_PEMBELAJARAN: materi,
                JUMLAH_SISWA_HADIR: presentList.length,
                SISWA_HADIR: presentList.join(', '),
                SISWA_ALPHA: alphaList.join(', '),
                SISWA_IZIN: izinList.join(', '),
                SISWA_SAKIT: sakitList.join(', '),
                JUMLAH_SISWA_TIDAK_HADIR: alphaList.length + izinList.length + sakitList.length,
                DOKUMENTASI: capturedPhotoData,
                FILE_ID_DRIVE: 'LOCAL_CACHE',
                IS_CACHED: true
            };

            if (isEditMode) {
                formData.type = 'UPDATE_JURNAL';
                if (originalJournalKeys) {
                    formData.ORIGINAL_TANGGAL = originalJournalKeys.TANGGAL;
                    formData.ORIGINAL_JAM_KE = originalJournalKeys.JAM_KE;
                    formData.ORIGINAL_KELAS = originalJournalKeys.KELAS;
                }
            }

            const cachedJurnals = JSON.parse(localStorage.getItem('cached_jurnals') || '[]');
            if (isEditMode && currentEditingId) {
                const index = cachedJurnals.findIndex(item => (item.ID === currentEditingId || (item.TANGGAL + item.JAM_KE) === currentEditingId));
                if (index !== -1) cachedJurnals[index] = formData;
                else { formData.ID = 'UPDATED-' + Date.now(); cachedJurnals.unshift(formData); }
            } else {
                cachedJurnals.unshift(formData);
            }

            localStorage.setItem('cached_jurnals', JSON.stringify(cachedJurnals));

            setTimeout(() => {
                showToast(isEditMode ? '✅ Jurnal telah diperbarui.' : '✅ Jurnal tersimpan.', 'success');
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                isEditMode = false;
                currentEditingId = null;
                switchScreen('journal-form-screen', 'dashboard-screen');

                // Trigger auto-sync if online
                if (navigator.onLine) syncOfflineData();
            }, 800);

        } catch (err) {
            console.error('Submit Error:', err);
            showAlert('❌ Gagal Simpan', 'Terjadi kesalahan: ' + err.message, 'error');
            const submitBtn = journalEntryForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = 'Coba Simpan Lagi';
            }
        }
    });

    if (literasiEntryForm) {
        literasiEntryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = literasiEntryForm.querySelector('button[type="submit"]');
            const kelas = document.getElementById('literasi-kelas').value;
            const ruang = document.getElementById('literasi-ruang').value;
            const kegiatan = document.getElementById('literasi-kegiatan').value;

            if (!literasiCapturedPhotoData) {
                showToast('Foto Dokumentasi WAJIB diambil!', 'error');
                return;
            }

            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            const now = new Date();
            const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];

            const literasiData = {
                ID: Date.now(),
                TANGGAL: now.toLocaleDateString('en-CA'),
                HARI: days[now.getDay()],
                NAMA_GURU: userData.NAMA || 'Unknown',
                KODE_GURU: userData.NIP || userData.KODEGURU || '',
                KELAS: kelas,
                RUANG: ruang,
                KEGIATAN: kegiatan,
                FOTO_KEGIATAN: literasiCapturedPhotoData
            };

            submitBtn.disabled = true;
            submitBtn.innerText = 'Menyimpan...';

            try {
                const cached = JSON.parse(localStorage.getItem('cached_literasi') || '[]');
                cached.push(literasiData);
                localStorage.setItem('cached_literasi', JSON.stringify(cached));

                showToast('✅ Literasi Pagi tersimpan.', 'success');

                setTimeout(() => {
                    renderLiterasiRekapList();
                    switchScreen('literasi-form-screen', 'literasi-rekap-screen');
                    if (navigator.onLine) syncOfflineData();
                }, 1500);
            } catch (err) {
                console.error('Literasi Submit Error:', err);
                showAlert('❌ Gagal Simpan', 'Terjadi kesalahan: ' + err.message, 'error');
                submitBtn.disabled = false;
                submitBtn.innerText = 'Simpan Literasi';
            }
        });
    }

    if (piketEntryForm) {
        piketEntryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = piketEntryForm.querySelector('button[type="submit"]');
            const jamPiket = document.getElementById('piket-jam').value;
            const guruAbsent = document.getElementById('piket-guru-absent').value;
            const keterangan = document.getElementById('piket-keterangan').value;
            const kelas = document.getElementById('piket-kelas').value;
            const tugas = document.getElementById('piket-tugas').value;
            const catatan = document.getElementById('piket-catatan').value;

            if (!jamPiket) {
                showToast('Pilih jam piket!', 'warning');
                return;
            }

            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            const now = new Date();
            const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];

            const piketData = {
                ID_PIKET: Date.now(),
                TANGGAL: now.toLocaleDateString('en-CA'),
                HARI: days[now.getDay()],
                NAMA_GURU_PIKET: userData.NAMA || 'Unknown',
                KODE_GURU: userData.NIP || userData.KODEGURU || '',
                JAM_PIKET: jamPiket,
                NAMA_GURU_YANG_TIDAK_HADIR: guruAbsent,
                KETERANGAN: keterangan,
                KELAS_YANG_DITINGGALKAN: kelas,
                TUGAS_YANG_DIBERIKAN_KE_SISWA: tugas,
                CATATAN_GURU_PIKET: catatan
            };

            submitBtn.disabled = true;
            submitBtn.innerText = 'Menyimpan...';

            try {
                const cached = JSON.parse(localStorage.getItem('cached_piket') || '[]');
                cached.push(piketData);
                localStorage.setItem('cached_piket', JSON.stringify(cached));

                showToast('✅ Laporan Piket tersimpan.', 'success');

                setTimeout(() => {
                    switchScreen('piket-form-screen', 'dashboard-screen');
                    if (navigator.onLine) syncOfflineData();
                }, 1500);
            } catch (err) {
                console.error('Piket Submit Error:', err);
                showAlert('❌ Gagal Simpan', 'Terjadi kesalahan: ' + err.message, 'error');
                submitBtn.disabled = false;
                submitBtn.innerText = 'Simpan Laporan Piket';
            }
        });
    }

    menuRekap.addEventListener('click', () => {
        if (typeof window.refreshBackgroundData === 'function') window.refreshBackgroundData();
        renderRekapList();
        switchScreen('dashboard-screen', 'rekap-screen');
    });

    let filteredEksporData = [];
    let currentTeacherName = '';

    if (menuEkspor) {
        menuEkspor.addEventListener('click', () => {
            if (typeof window.refreshBackgroundData === 'function') window.refreshBackgroundData();

            // Setup years dynamically
            if (filterTahun) {
                const currentYear = new Date().getFullYear();
                filterTahun.innerHTML = `
                    <option value="${currentYear}">${currentYear}</option>
                    <option value="${currentYear - 1}">${currentYear - 1}</option>
                `;
            }

            // Reset preview
            if (eksporPreviewContainer) eksporPreviewContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">Pilih filter dan terapkan untuk melihat data.</p>';
            if (btnGeneratePdf) btnGeneratePdf.style.display = 'none';
            filteredEksporData = [];

            switchScreen('dashboard-screen', 'ekspor-screen');
        });
    }

    if (backFromEkspor) {
        backFromEkspor.addEventListener('click', () => {
            switchScreen('ekspor-screen', 'dashboard-screen');
        });
    }

    if (btnTerapkanFilter) {
        btnTerapkanFilter.addEventListener('click', () => {
            const savedUser = JSON.parse(localStorage.getItem('userData') || '{}');
            currentTeacherName = String(savedUser.NAMA || '').toUpperCase().trim();
            if (!currentTeacherName) {
                showToast('❌ Anda belum login', 'error');
                return;
            }

            const selectedBulan = filterBulan ? filterBulan.value : '';
            const selectedTahun = filterTahun ? filterTahun.value : '';

            btnTerapkanFilter.innerText = '⌛ Memproses...';

            setTimeout(() => {
                // Get Server Data
                const server = jurnalData.filter(j => {
                    const dbNama = String(getVal(j, ['NAMA', 'NAMA_GURU']) || '').toUpperCase().trim();
                    return dbNama.includes(currentTeacherName);
                });

                // Get Cached Data
                const cached = JSON.parse(localStorage.getItem('cached_jurnals') || '[]');

                const normalizeDate = (s) => {
                    if (!s || typeof s !== 'string') return '';
                    if (s.includes('-')) return s;
                    if (s.includes('/')) {
                        const parts = s.split('/');
                        if (parts.length === 3) return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                    }
                    return s;
                };

                const combined = [...server];
                cached.forEach(c => {
                    const cDate = normalizeDate(c.TANGGAL);
                    const exists = combined.find(s => {
                        return s.TANGGAL === cDate && String(s.JAM_KE) === String(c.JAM_KE);
                    });
                    if (!exists) combined.push(c);
                });

                // Filter by month and year
                filteredEksporData = combined.filter(row => {
                    const dateStr = normalizeDate(row.TANGGAL || row.Tanggal || row.tanggal);
                    if (!dateStr) return false;
                    const parts = dateStr.split('-'); // YYYY-MM-DD
                    if (parts.length === 3) {
                        return parts[0] === selectedTahun && parts[1] === selectedBulan;
                    }
                    return false;
                });

                // Sort newest first
                filteredEksporData.sort((a, b) => new Date(normalizeDate(b.TANGGAL)) - new Date(normalizeDate(a.TANGGAL)));

                // Render Preview Table
                if (filteredEksporData.length === 0) {
                    eksporPreviewContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">Tidak ada data jurnal pada bulan dan tahun ini.</p>';
                    btnGeneratePdf.style.display = 'none';
                } else {
                    let tableHTML = `
                        <table style="width: 100%; min-width: 600px; border-collapse: collapse; text-align: left;">
                            <thead>
                                <tr style="background: var(--primary); color: white;">
                                    <th style="padding: 0.5rem; border: 1px solid #e2e8f0;">No</th>
                                    <th style="padding: 0.5rem; border: 1px solid #e2e8f0;">Tanggal</th>
                                    <th style="padding: 0.5rem; border: 1px solid #e2e8f0;">Kelas</th>
                                    <th style="padding: 0.5rem; border: 1px solid #e2e8f0;">Mapel</th>
                                    <th style="padding: 0.5rem; border: 1px solid #e2e8f0;">Kehadiran</th>
                                </tr>
                            </thead>
                            <tbody>
                    `;

                    filteredEksporData.forEach((row, index) => {
                        const tgl = getVal(row, ['TANGGAL', 'Tanggal', 'tanggal']);
                        const kls = getVal(row, ['KELAS', 'Kelas', 'kelas']);
                        const mpl = getVal(row, ['MAPEL', 'MATA_PELAJARAN', 'Mapel', 'mapel']);

                        const getCount = (val) => {
                            if (val === undefined || val === null || val === '') return 0;
                            if (typeof val === 'number') return val;
                            return String(val).split(',').filter(x => x.trim()).length;
                        };

                        const hdr = getVal(row, ['JUMLAH_SISWA_HADIR', 'HADIR', 'Hadir', 'hadir']) || 0;
                        const alp = getCount(getVal(row, ['SISWA_ALPHA', 'ALPHA', 'Alpha', 'alpha']));
                        const izn = getCount(getVal(row, ['SISWA_IZIN', 'IZIN', 'Izin', 'izin']));
                        const skt = getCount(getVal(row, ['SISWA_SAKIT', 'SAKIT', 'Sakit', 'sakit']));
                        const kehadiranStr = `H:${hdr} A:${alp} I:${izn} S:${skt}`;

                        tableHTML += `
                            <tr style="background: ${index % 2 === 0 ? 'white' : '#f8fafc'};">
                                <td style="padding: 0.5rem; border: 1px solid #e2e8f0; text-align: center;">${index + 1}</td>
                                <td style="padding: 0.5rem; border: 1px solid #e2e8f0;">${tgl}</td>
                                <td style="padding: 0.5rem; border: 1px solid #e2e8f0; text-align: center;">${kls}</td>
                                <td style="padding: 0.5rem; border: 1px solid #e2e8f0;">${mpl}</td>
                                <td style="padding: 0.5rem; border: 1px solid #e2e8f0; text-align: center;">${kehadiranStr}</td>
                            </tr>
                        `;
                    });

                    tableHTML += `</tbody></table>`;
                    eksporPreviewContainer.innerHTML = tableHTML;
                    btnGeneratePdf.style.display = 'block';
                }

                btnTerapkanFilter.innerText = '🔍 Terapkan Filter';
                showToast('✅ Filter diterapkan', 'success');
            }, 500);
        });
    }

    if (btnGeneratePdf) {
        btnGeneratePdf.addEventListener('click', () => {
            if (filteredEksporData.length === 0) {
                showToast('❌ Tidak ada data untuk diekspor', 'error');
                return;
            }

            btnGeneratePdf.innerText = '⌛ Menyiapkan Laporan & Lampiran (Tunggu Sebentar)...';
            btnGeneratePdf.disabled = true;

            setTimeout(async () => {
                try {
                    if (typeof generateJurnalPDF !== 'function') throw new Error('Fungsi PDF belum termuat');
                    await generateJurnalPDF(filteredEksporData, currentTeacherName, dokData);
                } catch (err) {
                    console.error('Error generating PDF:', err);
                    showAlert('❌ Gagal', 'Gagal memproses PDF: ' + err.message, 'error');
                } finally {
                    btnGeneratePdf.innerText = '📄 Unduh PDF Sekarang';
                    btnGeneratePdf.disabled = false;
                }
            }, 800);
        });
    }

    backFromRekap.addEventListener('click', () => {
        switchScreen('rekap-screen', 'dashboard-screen');
    });

    function renderRekapList() {
        rekapListContainer.innerHTML = '';
        const savedUser = JSON.parse(localStorage.getItem('userData') || '{}');
        const userNama = (savedUser.NAMA || '').toUpperCase().trim();

        // Get cached data (Local)
        const cachedData = JSON.parse(localStorage.getItem('cached_jurnals') || '[]');

        // Filter server data by current teacher name
        const filteredServerData = jurnalData.filter(j => {
            const dbNama = (j.NAMA_GURU || j.NAMA || '').toUpperCase().trim();
            return userNama && dbNama === userNama;
        });

        // Combine (Prefer Server Data, fallback to Cache)
        const combined = [...filteredServerData];
        cachedData.forEach(c => {
            const exists = combined.find(s =>
                s.TANGGAL === c.TANGGAL &&
                (s.JAM_KE || s.JAM) === (c.JAM_KE || c.JAM) &&
                (s.KELAS || '') === (c.KELAS || '')
            );
            if (!exists) combined.push(c);
        });

        // Sort newest first: by TANGGAL desc, then JAM_KE desc
        const combinedData = combined.sort((a, b) => {
            const tA = a.TANGGAL || '';
            const tB = b.TANGGAL || '';
            if (tB !== tA) return tB.localeCompare(tA);
            // Compare first jam number in JAM_KE
            const jamA = parseInt((a.JAM_KE || a.JAM || '0').split(',')[0]) || 0;
            const jamB = parseInt((b.JAM_KE || b.JAM || '0').split(',')[0]) || 0;
            return jamB - jamA;
        });

        if (combinedData.length === 0) {
            rekapListContainer.innerHTML = `
                <div style="text-align:center; padding:4rem 2rem; color:var(--text-muted);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📭</div>
                    <p>Belum ada riwayat jurnal untuk <b>${savedUser.NAMA || 'Anda'}</b>.</p>
                </div>`;
            return;
        }

        combinedData.forEach(j => {
            // Helpers for image extraction (Server Data)
            const getFileId = (obj) => {
                const rawIdDrive = obj.FILE_ID_DRIVE || obj.FILE_ID || '';
                if (rawIdDrive && rawIdDrive !== "NOT FOUND" && !rawIdDrive.includes('LOCAL_CACHE')) return rawIdDrive.trim();
                const rawDok = obj.DOKUMENTASI || obj.FILE || '';
                if (!rawDok || rawDok.startsWith('data:image')) return ''; // Skip base64 here
                const idMatch = rawDok.match(/[-\w]{25,}/);
                return idMatch ? idMatch[0] : '';
            };

            const fileId = getFileId(j);
            const thumbUrl = j.IS_CACHED ? j.DOKUMENTASI : (fileId ? `https://lh3.googleusercontent.com/d/${fileId}=w600` : null);
            const fallbackUrl = (!j.IS_CACHED && fileId) ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w600` : null;

            // Stats parsing
            const countNames = (str) => {
                if (!str) return 0;
                return str.split(',').map(n => n.trim()).filter(n => n).length;
            };

            const card = document.createElement('div');
            card.className = 'rekap-card';
            card.style.cursor = 'pointer';

            card.innerHTML = `
                <div class="post-header">
                    <div class="post-avatar">👨‍🏫</div>
                    <div class="post-user-info">
                        <h5>${j.NAMA_GURU || userNama} ${j.IS_CACHED ? '<span class="cache-badge">CACHE</span>' : ''}</h5>
                        <p>${j.HARI || ''}, ${formatIndonesianDate(j.TANGGAL)} • Jam ${j.JAM_KE || j.JAM || ''}</p>
                    </div>
                </div>

                <div class="post-content">
                    <h4 style="color: var(--primary); font-weight: 800; margin-bottom: 0.25rem;">${j.MAPEL || ''}</h4>
                    <p style="font-size: 0.875rem; color: var(--text);">${j.MATERI_PEMBELAJARAN || j.MATERI || ''}</p>
                </div>
                
                ${thumbUrl ? `
                    <div class="rekap-thumbnail" style="position: relative; border-radius: 12px; overflow: hidden; margin-top: 1rem; background: #f1f5f9;">
                        <div class="skeleton" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"></div>
                        <img src="${thumbUrl}" data-fallback="${fallbackUrl}" alt="Dokumentasi" 
                             style="opacity: 0; transition: opacity 0.4s ease; width: 100%; display: block;"
                             onload="this.style.opacity='1'; this.previousElementSibling.style.display='none';"
                             onerror="if(this.dataset.fallback && this.src !== this.dataset.fallback) { this.src = this.dataset.fallback; } else { this.parentElement.style.display='none'; }">
                    </div>
                ` : ''}

                <div class="post-footer">
                    <div class="post-stats">
                        <div class="stat-pill">
                            <span class="val">${j.JUMLAH_SISWA_HADIR || countNames(j.SISWA_HADIR)}</span>
                            <span class="label">Hadir</span>
                        </div>
                        <div class="stat-pill">
                            <span class="val">${countNames(j.SISWA_ALPHA)}</span>
                            <span class="label">Alpha</span>
                        </div>
                        <div class="stat-pill">
                            <span class="val">${countNames(j.SISWA_IZIN)}</span>
                            <span class="label">Izin</span>
                        </div>
                        <div class="stat-pill">
                            <span class="val">${countNames(j.SISWA_SAKIT)}</span>
                            <span class="label">Sakit</span>
                        </div>
                    </div>
                    <div style="font-size: 0.75rem; font-weight: 800; color: var(--secondary); background: #f1f5f9; padding: 4px 10px; border-radius: 20px;">
                        ${j.KELAS || ''}
                    </div>
                </div>
            `;

            card.addEventListener('click', () => showJournalDetail(j));
            rekapListContainer.appendChild(card);
        });
    }

    window.clearJournalCache = function () {
        if (confirm('⚠️ PERINGATAN!\n\nSemua data jurnal yang belum terkirim ke server (CACHE) akan dihapus secara permanen.\n\nApakah Anda yakin ingin melanjutkan?')) {
            localStorage.removeItem('cached_jurnals');
            showToast('Cache berhasil dibersihkan.', 'success');
            renderRekapList();
            updateDashboard(JSON.parse(localStorage.getItem('userData') || '{}'));
        }
    };

    // --- LAPORAN KEHADIRAN LOGIC ---
    if (menuLaporanKehadiran) {
        menuLaporanKehadiran.addEventListener('click', () => {
            const savedUser = JSON.parse(localStorage.getItem('userData') || '{}');
            const currentTeacherName = (savedUser.NAMA || savedUser.Nama || savedUser.nama || '').trim();
            const bkData = JSON.parse(localStorage.getItem('cached_bk') || '[]');
            
            const userRole = String(savedUser.JABATAN || savedUser.STATUS || savedUser.KET || savedUser.ROLE || '').toUpperCase();
            const isGuruBK = userRole.includes('GURU BK') || userRole.includes('BK') || bkData.some(b => {
                const bkName = String(b.NAMA || b.NAMA_GURU_BK || b.GURU_BK || b.GURUBK || b.Nama_Guru_BK || '').trim().toLowerCase();
                return bkName === currentTeacherName.toLowerCase();
            });

            if (!isGuruBK) {
                showToast('Hanya Guru BK yang diperbolehkan mengakses Laporan Kehadiran!', 'error');
                return;
            }
            initLaporanKehadiranForm();
            switchScreen('dashboard-screen', 'laporan-kehadiran-screen');
        });
    }

    if (backFromLaporanKehadiran) {
        backFromLaporanKehadiran.addEventListener('click', () => {
            switchScreen('laporan-kehadiran-screen', 'dashboard-screen');
        });
    }

    function initLaporanKehadiranForm() {
        // Reset result area
        if (laporanKehadiranResult) laporanKehadiranResult.style.display = 'none';
        if (laporanKehadiranTbody) laporanKehadiranTbody.innerHTML = '';
        if (semesterRecapContainer) semesterRecapContainer.style.display = 'none';

        // Populate class dropdown if not yet populated
        if (filterLaporanKelas && filterLaporanKelas.options.length <= 1) {
            const classes = [...new Set(studentsData.map(s => s.KELAS))].filter(Boolean).sort();
            classes.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c;
                opt.textContent = c;
                filterLaporanKelas.appendChild(opt);
            });
        }

        // Populate year dropdown
        if (filterLaporanTahun && filterLaporanTahun.options.length === 0) {
            const currentYear = new Date().getFullYear();
            for (let y = currentYear; y >= currentYear - 3; y--) {
                const opt = document.createElement('option');
                opt.value = y;
                opt.textContent = y;
                filterLaporanTahun.appendChild(opt);
            }
        }

        // Set default month to current
        if (filterLaporanBulan) {
            const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
            filterLaporanBulan.value = currentMonth;
        }
    }

    if (btnSmtGanjil) {
        btnSmtGanjil.addEventListener('click', () => handleSemesterExport('ganjil'));
    }

    if (btnSmtGenap) {
        btnSmtGenap.addEventListener('click', () => handleSemesterExport('genap'));
    }

    function handleSemesterExport(semesterType) {
        const kelas = filterLaporanKelas ? filterLaporanKelas.value : '';
        const tahun = filterLaporanTahun ? filterLaporanTahun.value : String(new Date().getFullYear());

        if (!kelas) {
            showToast('Silakan pilih kelas terlebih dahulu!', 'warning');
            return;
        }

        // Determine which months belong to this semester
        let months = [];
        if (semesterType === 'ganjil') {
            months = ['07', '08', '09', '10', '11', '12'];
        } else {
            months = ['01', '02', '03', '04', '05', '06'];
        }

        // Get students in class (ignoring blank ones)
        const studentsInClass = studentsData.filter(s => 
            s.KELAS === kelas && (s.NAMA_PESERTA_DIDIK || s.NAMA || '').trim() !== ''
        ).sort((a, b) => {
            const nameA = a.NAMA_PESERTA_DIDIK || a.NAMA || '';
            const nameB = b.NAMA_PESERTA_DIDIK || b.NAMA || '';
            return nameA.localeCompare(nameB);
        });

        if (studentsInClass.length === 0) {
            showToast('Tidak ada data siswa untuk kelas ini.', 'warning');
            return;
        }

        // Initialize attendance map
        const attendanceMap = {};
        studentsInClass.forEach(s => {
            const studentName = s.NAMA_PESERTA_DIDIK || s.NAMA;
            if (studentName) {
                attendanceMap[studentName.toUpperCase().trim()] = {
                    S: 0, I: 0, A: 0, NAMA: studentName
                };
            }
        });

        // Combine jurnalData + cached
        const cachedJurnals = JSON.parse(localStorage.getItem('cached_jurnals') || '[]');
        const combinedJurnals = [...jurnalData];
        cachedJurnals.forEach(c => {
            const exists = combinedJurnals.find(s => 
                s.TANGGAL === c.TANGGAL && (s.JAM_KE || s.JAM) === (c.JAM_KE || c.JAM) && s.KELAS === c.KELAS
            );
            if (!exists) combinedJurnals.push(c);
        });

        // Filter by class, mapel BK, and semester months
        const filteredJurnals = combinedJurnals.filter(j => {
            if (j.KELAS !== kelas) return false;
            if ((j.MAPEL || '').trim() !== 'Presensi (Bimbingan Konseling)') return false;
            if (!j.TANGGAL) return false;
            const parts = j.TANGGAL.split('-'); // YYYY-MM-DD
            if (parts.length < 3) return false;
            const jYear = parts[0];
            const jMonth = parts[1];
            return jYear === String(tahun) && months.includes(jMonth);
        });

        // Aggregate attendance
        filteredJurnals.forEach(j => {
            const parseAbsen = (fieldStr, type) => {
                if (!fieldStr || fieldStr === '-' || fieldStr.trim() === '') return;
                const names = fieldStr.split(',').map(n => n.trim().toUpperCase());
                names.forEach(name => {
                    if (attendanceMap[name]) {
                        attendanceMap[name][type]++;
                    } else {
                        const matchedKey = Object.keys(attendanceMap).find(k => k.includes(name) || name.includes(k));
                        if (matchedKey) attendanceMap[matchedKey][type]++;
                    }
                });
            };
            parseAbsen(j.SISWA_SAKIT, 'S');
            parseAbsen(j.SISWA_IZIN, 'I');
            parseAbsen(j.SISWA_ALPHA, 'A');
        });

        // Build reportData
        const reportData = [];
        let no = 1;
        Object.values(attendanceMap).forEach(data => {
            reportData.push({
                NO: no++,
                NAMA: data.NAMA,
                S: data.S,
                I: data.I,
                A: data.A,
                TOTAL: data.S + data.I + data.A
            });
        });

        if (typeof generateLaporanSemesterPDF === 'function') {
            generateLaporanSemesterPDF(kelas, semesterType, tahun, reportData, null);
        } else {
            showToast('Fitur PDF belum tersedia.', 'error');
        }
    }


    if (btnTerapkanLaporan) {
        btnTerapkanLaporan.addEventListener('click', () => {
            const selectedKelas = filterLaporanKelas.value;
            const selectedBulan = filterLaporanBulan.value;
            const selectedTahun = filterLaporanTahun.value;

            if (!selectedKelas) {
                showToast('Silakan pilih kelas terlebih dahulu!', 'warning');
                return;
            }

            renderLaporanKehadiran(selectedKelas, selectedBulan, selectedTahun);
        });
    }

    let currentLaporanData = [];

    function renderLaporanKehadiran(kelas, bulan, tahun) {
        laporanKehadiranTbody.innerHTML = '<tr><td colspan="6">Memuat data...</td></tr>';
        laporanKehadiranResult.style.display = 'flex';

        // 1. Dapatkan daftar semua siswa di kelas ini
        const studentsInClass = studentsData.filter(s => s.KELAS === kelas && (s.NAMA_PESERTA_DIDIK || s.NAMA || '').trim() !== '').sort((a, b) => {
            const nameA = a.NAMA_PESERTA_DIDIK || a.NAMA || '';
            const nameB = b.NAMA_PESERTA_DIDIK || b.NAMA || '';
            return nameA.localeCompare(nameB);
        });

        if (studentsInClass.length === 0) {
            laporanKehadiranTbody.innerHTML = '<tr><td colspan="6">Tidak ada data siswa untuk kelas ini.</td></tr>';
            return;
        }

        // 2. Inisialisasi Map Kehadiran & Jumlah Hari
        const daysInMonth = new Date(parseInt(tahun), parseInt(bulan), 0).getDate();

        // Pre-calculate daily defaults (OFF for weekends, '-' for weekdays)
        const defaultDaily = Array(daysInMonth).fill('-');
        for (let i = 0; i < daysInMonth; i++) {
            const d = new Date(parseInt(tahun), parseInt(bulan) - 1, i + 1);
            const dayOfWeek = d.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                defaultDaily[i] = 'OFF';
            }
        }

        const attendanceMap = {};
        studentsInClass.forEach(s => {
            const studentName = s.NAMA_PESERTA_DIDIK || s.NAMA;
            if (studentName) {
                attendanceMap[studentName.toUpperCase().trim()] = {
                    S: 0, I: 0, A: 0,
                    NAMA: studentName,
                    daily: [...defaultDaily]
                };
            }
        });

        // 3. Filter Jurnal Data berdasarkan Kelas, Bulan, Tahun
        const cachedJurnals = JSON.parse(localStorage.getItem('cached_jurnals') || '[]');
        const combinedJurnals = [...jurnalData];
        cachedJurnals.forEach(c => {
            const exists = combinedJurnals.find(s => s.TANGGAL === c.TANGGAL && (s.JAM_KE || s.JAM) === (c.JAM_KE || c.JAM) && s.KELAS === c.KELAS);
            if (!exists) combinedJurnals.push(c);
        });

        const targetMonthPrefix = `${tahun}-${bulan}`; // e.g. "2026-05"

        const filteredJurnals = combinedJurnals.filter(j => {
            if (j.KELAS !== kelas) return false;
            // Only count journals with MAPEL "Presensi (Bimbingan Konseling)"
            if ((j.MAPEL || '').trim() !== 'Presensi (Bimbingan Konseling)') return false;
            // TANGGAL format is usually YYYY-MM-DD
            if (j.TANGGAL && j.TANGGAL.startsWith(targetMonthPrefix)) return true;
            return false;
        });

        // 4. Hitung Absen Harian
        const activeDates = new Set();
        filteredJurnals.forEach(j => {
            // Get date index (0-based) from YYYY-MM-DD string to avoid timezone shifts
            if (!j.TANGGAL || !j.TANGGAL.includes('-')) return;
            const parts = j.TANGGAL.split('-');
            const dateNum = parseInt(parts[2], 10);
            if (isNaN(dateNum)) return;
            const dateIdx = dateNum - 1;
            activeDates.add(dateIdx);

            const parseAbsen = (fieldStr, type) => {
                if (!fieldStr || fieldStr === '-' || fieldStr.trim() === '') return;
                const names = fieldStr.split(',').map(n => n.trim().toUpperCase());
                names.forEach(name => {
                    // Try to find exact match
                    if (attendanceMap[name]) {
                        attendanceMap[name][type]++;
                        attendanceMap[name].daily[dateIdx] = type;
                    } else {
                        // Try to find partial match if exact match fails
                        const matchedKey = Object.keys(attendanceMap).find(k => k.includes(name) || name.includes(k));
                        if (matchedKey) {
                            attendanceMap[matchedKey][type]++;
                            attendanceMap[matchedKey].daily[dateIdx] = type;
                        }
                    }
                });
            };

            parseAbsen(j.SISWA_SAKIT, 'S');
            parseAbsen(j.SISWA_IZIN, 'I');
            parseAbsen(j.SISWA_ALPHA, 'A');
        });

        // Set 'H' for students who are not S/I/A on active dates
        activeDates.forEach(dateIdx => {
            Object.values(attendanceMap).forEach(data => {
                if (data.daily[dateIdx] === '-') {
                    data.daily[dateIdx] = 'H';
                }
            });
        });

        // 5. Render ke Tabel (Tabel pratinjau tetap menampilkan total saja)
        laporanKehadiranTbody.innerHTML = '';
        currentLaporanData = [];

        let no = 1;
        Object.values(attendanceMap).forEach(data => {
            const total = data.S + data.I + data.A;
            // Pass daily data array directly for PDF generator
            currentLaporanData.push({
                NO: no, NAMA: data.NAMA,
                S: data.S, I: data.I, A: data.A,
                TOTAL: total,
                DAILY: data.daily
            });

            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid rgba(0,0,0,0.05)';
            tr.innerHTML = `
                <td style="padding: 0.5rem;">${no++}</td>
                <td style="padding: 0.5rem; text-align: left; font-weight: 600;">${data.NAMA}</td>
                <td style="padding: 0.5rem; color: #f59e0b;">${data.S}</td>
                <td style="padding: 0.5rem; color: #3b82f6;">${data.I}</td>
                <td style="padding: 0.5rem; color: #ef4444;">${data.A}</td>
                <td style="padding: 0.5rem; font-weight: 800;">${total}</td>
            `;
            laporanKehadiranTbody.appendChild(tr);
        });

        if (currentLaporanData.length === 0) {
            laporanKehadiranTbody.innerHTML = '<tr><td colspan="6">Data kosong</td></tr>';
        } else {
            if (semesterRecapContainer) {
                semesterRecapContainer.style.display = 'block';
            }
        }
    }

    if (btnUnduhLaporanPdf) {
        btnUnduhLaporanPdf.addEventListener('click', () => {
            const kelas = filterLaporanKelas.value;
            const bulan = filterLaporanBulan.options[filterLaporanBulan.selectedIndex].text;
            const tahun = filterLaporanTahun.value;

            if (currentLaporanData.length === 0) {
                showToast('Tidak ada data untuk diekspor', 'warning');
                return;
            }

            if (typeof generateLaporanKehadiranPDF === 'function') {
                btnUnduhLaporanPdf.innerText = '⌛ Proses...';
                generateLaporanKehadiranPDF(kelas, bulan, tahun, currentLaporanData);
                setTimeout(() => {
                    btnUnduhLaporanPdf.innerText = '📄 Cetak PDF';
                }, 2000);
            } else {
                showToast('Fitur PDF belum tersedia', 'error');
            }
        });
    }
    // --- REKAP GURU MAPEL LOGIC ---
    if (menuRekapGuruMapel) {
        menuRekapGuruMapel.addEventListener('click', () => {
            initRekapGuruMapelForm();
            switchScreen('dashboard-screen', 'rekap-guru-mapel-screen');
        });
    }

    if (backFromRekapGuruMapel) {
        backFromRekapGuruMapel.addEventListener('click', () => {
            switchScreen('rekap-guru-mapel-screen', 'dashboard-screen');
        });
    }

    function initRekapGuruMapelForm() {
        rekapMapelResult.style.display = 'none';

        // Populate Kelas
        if (filterMapelKelas.options.length <= 1) {
            const classes = [...new Set(studentsData.map(s => s.KELAS))].filter(Boolean).sort();
            classes.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c;
                opt.textContent = c;
                filterMapelKelas.appendChild(opt);
            });
        }

        // Populate Mapel dropdown (filtered by the logged-in teacher)
        filterMapelMapel.innerHTML = '<option value="">-- Pilih Mapel --</option>';
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const userName = (userData.NAMA || '').toUpperCase().trim();
        const userKode = (userData.KODEGURU || userData['KODE GURU'] || '').toUpperCase().trim();

        const teacherSubjects = subjectsData.filter(s => {
            const sGuruRaw = (getVal(s, ['NAMA_GURU', 'GURU', 'NAMA']) || '').toUpperCase();
            const sKodeRaw = (getVal(s, ['KODEGURU', 'KODE_GURU', 'KODE']) || '').toUpperCase();
            const gurus = sGuruRaw.split(',').map(n => n.trim());
            const kodes = sKodeRaw.split(',').map(k => k.trim());
            return (userName && gurus.includes(userName)) || (userKode && kodes.includes(userKode));
        });

        // Use filtered subjects, or fallback to all if none found (to prevent empty list)
        const sourceData = teacherSubjects.length > 0 ? teacherSubjects : subjectsData;
        const uniqueMapels = [...new Set(sourceData.map(s => s.NAMA_MAPEL || s.MAPEL).filter(m => m))].sort();
        uniqueMapels.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m;
            opt.textContent = m;
            filterMapelMapel.appendChild(opt);
        });

        // Populate Tahun (Current year and previous year)
        if (filterMapelTahun.options.length === 0) {
            const currentYear = new Date().getFullYear();
            for (let i = currentYear; i >= currentYear - 2; i--) {
                const opt = document.createElement('option');
                opt.value = i;
                opt.textContent = i;
                filterMapelTahun.appendChild(opt);
            }
        }

        // Set default to current month and year
        const now = new Date();
        filterMapelBulan.value = String(now.getMonth() + 1).padStart(2, '0');
        filterMapelTahun.value = now.getFullYear();
    }

    if (btnTerapkanMapel) {
        btnTerapkanMapel.addEventListener('click', () => {
            const selectedKelas = filterMapelKelas.value;
            const selectedMapel = filterMapelMapel.value;
            const selectedBulan = filterMapelBulan.value;
            const selectedTahun = filterMapelTahun.value;

            if (!selectedKelas || !selectedMapel) {
                showToast('Silakan pilih kelas dan mata pelajaran terlebih dahulu!', 'warning');
                return;
            }

            renderRekapGuruMapel(selectedKelas, selectedMapel, selectedBulan, selectedTahun);
        });
    }

    let currentRekapMapelData = [];

    function renderRekapGuruMapel(kelas, mapel, bulan, tahun) {
        rekapMapelTbody.innerHTML = '<tr><td colspan="6">Memuat data...</td></tr>';
        rekapMapelResult.style.display = 'flex';

        // 1. Get students in class
        const studentsInClass = studentsData.filter(s => s.KELAS === kelas && (s.NAMA_PESERTA_DIDIK || s.NAMA || '').trim() !== '').sort((a, b) => {
            const nameA = a.NAMA_PESERTA_DIDIK || a.NAMA || '';
            const nameB = b.NAMA_PESERTA_DIDIK || b.NAMA || '';
            return nameA.localeCompare(nameB);
        });

        if (studentsInClass.length === 0) {
            rekapMapelTbody.innerHTML = '<tr><td colspan="6">Tidak ada data siswa untuk kelas ini.</td></tr>';
            return;
        }

        // 2. Initialize Map Kehadiran & Jumlah Hari
        const daysInMonth = new Date(parseInt(tahun), parseInt(bulan), 0).getDate();
        const defaultDaily = Array(daysInMonth).fill('-');
        for (let i = 0; i < daysInMonth; i++) {
            const d = new Date(parseInt(tahun), parseInt(bulan) - 1, i + 1);
            const dayOfWeek = d.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                defaultDaily[i] = 'OFF';
            }
        }

        const attendanceMap = {};
        studentsInClass.forEach(s => {
            const studentName = s.NAMA_PESERTA_DIDIK || s.NAMA;
            if (studentName) {
                attendanceMap[studentName.toUpperCase().trim()] = {
                    S: 0, I: 0, A: 0,
                    NAMA: studentName,
                    daily: [...defaultDaily]
                };
            }
        });

        // 3. Filter Jurnal Data based on Class, Mapel, Month, Year
        const cachedJurnals = JSON.parse(localStorage.getItem('cached_jurnals') || '[]');
        const combinedJurnals = [...jurnalData];
        cachedJurnals.forEach(c => {
            const exists = combinedJurnals.find(s => s.TANGGAL === c.TANGGAL && (s.JAM_KE || s.JAM) === (c.JAM_KE || c.JAM) && s.KELAS === c.KELAS);
            if (!exists) combinedJurnals.push(c);
        });

        const targetMonthPrefix = `${tahun}-${bulan}`; // e.g. "2026-05"
        const filteredJurnals = combinedJurnals.filter(j => {
            if (j.KELAS !== kelas) return false;
            if ((j.MAPEL || '').trim().toUpperCase() !== mapel.trim().toUpperCase()) return false;
            if (j.TANGGAL && j.TANGGAL.startsWith(targetMonthPrefix)) return true;
            return false;
        });

        // 4. Hitung Absen Harian
        const activeDates = new Set();
        filteredJurnals.forEach(j => {
            if (!j.TANGGAL || !j.TANGGAL.includes('-')) return;
            const parts = j.TANGGAL.split('-');
            const dateNum = parseInt(parts[2], 10);
            if (isNaN(dateNum)) return;
            const dateIdx = dateNum - 1;
            activeDates.add(dateIdx);

            const parseAbsen = (fieldStr, type) => {
                if (!fieldStr || fieldStr === '-' || fieldStr.trim() === '') return;
                const names = fieldStr.split(',').map(n => n.trim().toUpperCase());
                names.forEach(name => {
                    if (attendanceMap[name]) {
                        attendanceMap[name][type]++;
                        attendanceMap[name].daily[dateIdx] = type;
                    } else {
                        const matchedKey = Object.keys(attendanceMap).find(k => k.includes(name) || name.includes(k));
                        if (matchedKey) {
                            attendanceMap[matchedKey][type]++;
                            attendanceMap[matchedKey].daily[dateIdx] = type;
                        }
                    }
                });
            };

            parseAbsen(j.SISWA_SAKIT, 'S');
            parseAbsen(j.SISWA_IZIN, 'I');
            parseAbsen(j.SISWA_ALPHA, 'A');
        });

        // Set 'H' for students who are not S/I/A on active dates
        activeDates.forEach(dateIdx => {
            Object.values(attendanceMap).forEach(data => {
                if (data.daily[dateIdx] === '-') {
                    data.daily[dateIdx] = 'H';
                }
            });
        });

        // 5. Render to table
        rekapMapelTbody.innerHTML = '';
        currentRekapMapelData = [];

        let no = 1;
        Object.values(attendanceMap).forEach(data => {
            const total = data.S + data.I + data.A;
            currentRekapMapelData.push({
                NO: no, NAMA: data.NAMA,
                S: data.S, I: data.I, A: data.A,
                TOTAL: total,
                DAILY: data.daily
            });

            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid rgba(0,0,0,0.05)';
            tr.innerHTML = `
                <td style="padding: 0.5rem;">${no++}</td>
                <td style="padding: 0.5rem; text-align: left; font-weight: 600;">${data.NAMA}</td>
                <td style="padding: 0.5rem; color: #f59e0b;">${data.S}</td>
                <td style="padding: 0.5rem; color: #3b82f6;">${data.I}</td>
                <td style="padding: 0.5rem; color: #ef4444;">${data.A}</td>
                <td style="padding: 0.5rem; font-weight: 800;">${total}</td>
            `;
            rekapMapelTbody.appendChild(tr);
        });

        if (currentRekapMapelData.length === 0) {
            rekapMapelTbody.innerHTML = '<tr><td colspan="6">Data kosong</td></tr>';
        }
    }

    if (btnUnduhRekapMapelPdf) {
        btnUnduhRekapMapelPdf.addEventListener('click', () => {
            const kelas = filterMapelKelas.value;
            const mapel = filterMapelMapel.value;
            const bulan = filterMapelBulan.options[filterMapelBulan.selectedIndex].text;
            const tahun = filterMapelTahun.value;

            if (currentRekapMapelData.length === 0) {
                showToast('Tidak ada data untuk diekspor', 'warning');
                return;
            }

            if (typeof generateLaporanKehadiranPDF === 'function') {
                btnUnduhRekapMapelPdf.innerText = '⌛ Proses...';
                generateLaporanKehadiranPDF(kelas, bulan, tahun, currentRekapMapelData, mapel);
                setTimeout(() => {
                    btnUnduhRekapMapelPdf.innerText = '📄 Cetak PDF';
                }, 2000);
            } else {
                showToast('Fitur PDF belum tersedia', 'error');
            }
        });
    }

    // --- EVALUASI KEHADIRAN LOGIC ---
    if (menuEvaluasiKehadiran) {
        menuEvaluasiKehadiran.addEventListener('click', () => {
            initEvaluasiKehadiranForm();
            switchScreen('dashboard-screen', 'evaluasi-kehadiran-screen');
        });
    }

    if (backFromEvaluasiKehadiran) {
        backFromEvaluasiKehadiran.addEventListener('click', () => {
            switchScreen('evaluasi-kehadiran-screen', 'dashboard-screen');
        });
    }

    function initEvaluasiKehadiranForm() {
        evaluasiKehadiranResult.style.display = 'none';
        evaluasiKehadiranTbody.innerHTML = '';

        // Populate classes
        if (filterEvalKelas.options.length <= 1) {
            const classes = [...new Set(studentsData.map(s => s.KELAS))].filter(Boolean).sort();
            classes.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c;
                opt.textContent = c;
                filterEvalKelas.appendChild(opt);
            });
        }

        // Set default date to today
        if (filterEvalTanggal) {
            const today = new Date().toISOString().slice(0, 10);
            filterEvalTanggal.value = today;
        }
    }

    if (btnTerapkanEval) {
        btnTerapkanEval.addEventListener('click', () => {
            const kelas = filterEvalKelas.value;
            const tanggal = filterEvalTanggal.value;
            if (!kelas || !tanggal) {
                showToast('Silakan pilih kelas dan tanggal terlebih dahulu', 'warning');
                return;
            }
            renderEvaluasiKehadiran(tanggal, kelas);
        });
    }

    function renderEvaluasiKehadiran(tanggal, kelas) {
        evaluasiKehadiranTbody.innerHTML = '<tr><td colspan="6">Memuat data...</td></tr>';
        evaluasiKehadiranResult.style.display = 'flex';

        // Combine live and cached journals
        const combined = [...jurnalData, ...JSON.parse(localStorage.getItem('cached_jurnals') || '[]')];
        const dayJournals = combined.filter(j => j.TANGGAL === tanggal && j.KELAS === kelas);

        // Determine active jam numbers for that day/class
        const jamSet = new Set();
        const mapJamToMapel = {};
        dayJournals.forEach(j => {
            const jamRaw = (j.JAM_KE || j.JAM || '').toString();
            jamRaw.split(',').map(s => s.trim()).forEach(jamStr => {
                const jamNum = parseInt(jamStr, 10);
                if (!isNaN(jamNum)) {
                    jamSet.add(jamNum);
                    if (!mapJamToMapel[jamNum]) mapJamToMapel[jamNum] = new Set();
                    if (j.MAPEL) mapJamToMapel[jamNum].add(j.MAPEL);
                }
            });
        });

        const jamNumbers = Array.from(jamSet).sort((a, b) => a - b);
        const maxJam = jamNumbers.length ? Math.max(...jamNumbers) : 0;

        // Build header dynamic cells
        if (evalHeaderRow) {
            const jamThs = jamNumbers.map(j => `<th style="padding: 0.5rem 0.5rem;">J${j}</th>`).join('');
            evalHeaderRow.innerHTML = `
                <th style="padding: 0.5rem 0.5rem; width: 30px;">No</th>
                <th style="padding: 0.5rem 0.5rem; text-align: left;">Nama Siswa</th>
                ${jamThs}
                <th data-col="mapel" style="padding: 0.5rem 0.5rem; text-align: left;">Mapel Hari Ini</th>
                <th data-col="bolos" style="padding: 0.5rem 0.5rem;">Indikasi Bolos</th>
            `;
        }

        // Get students in class
        const studentsInClass = studentsData.filter(s => s.KELAS === kelas && (s.NAMA_PESERTA_DIDIK || s.NAMA || '').trim() !== '').sort((a, b) => {
            const nameA = (a.NAMA_PESERTA_DIDIK || a.NAMA || '').toUpperCase();
            const nameB = (b.NAMA_PESERTA_DIDIK || b.NAMA || '').toUpperCase();
            return nameA.localeCompare(nameB);
        });

        if (studentsInClass.length === 0) {
            // Hide result panel and reset header so stale jam-columns don't persist
            evaluasiKehadiranResult.style.display = 'none';
            if (evalHeaderRow) {
                evalHeaderRow.innerHTML = `
                    <th style="padding: 0.5rem 0.5rem; width: 30px;">No</th>
                    <th style="padding: 0.5rem 0.5rem; text-align: left;">Nama Siswa</th>
                    <th data-col="mapel" style="padding: 0.5rem 0.5rem; text-align: left;">Mapel Hari Ini</th>
                    <th data-col="bolos" style="padding: 0.5rem 0.5rem;">Indikasi Bolos</th>
                `;
            }
            showToast('Tidak ada data siswa untuk kelas ini.', 'warning');
            return;
        }

        // Build attendance map per student per jam
        const activeJams = jamNumbers; // e.g. [1,2,3]
        const attendanceByStudent = {};
        studentsInClass.forEach(s => {
            const name = (s.NAMA_PESERTA_DIDIK || s.NAMA || '').toUpperCase();
            attendanceByStudent[name] = {
                name: s.NAMA_PESERTA_DIDIK || s.NAMA || '',
                statuses: activeJams.map(() => '-')
            };
        });

        // Helper to assign statuses
        const assignStatusList = (fieldStr, code) => {
            if (!fieldStr) return;
            const names = fieldStr.split(',').map(n => n.trim().toUpperCase());
            names.forEach(nm => {
                const key = Object.keys(attendanceByStudent).find(k => k === nm || k.includes(nm) || nm.includes(k));
                if (!key) return;
                // find all journals where this student in that field and set status at corresponding jam(s)
                dayJournals.forEach(j => {
                    const jamRaw = (j.JAM_KE || j.JAM || '').toString();
                    jamRaw.split(',').map(s => s.trim()).forEach(jamStr => {
                        const jamNum = parseInt(jamStr, 10);
                        if (!isNaN(jamNum)) {
                            const idx = activeJams.indexOf(jamNum);
                            if (idx >= 0) attendanceByStudent[key].statuses[idx] = code;
                        }
                    });
                });
            });
        };

        // Populate S, I, A statuses from journals
        dayJournals.forEach(j => {
            assignStatusList(j.SISWA_SAKIT, 'S');
            assignStatusList(j.SISWA_IZIN, 'I');
            assignStatusList(j.SISWA_ALPHA, 'A');
        });

        // For any remaining '-' on active jams, mark as 'H'
        Object.values(attendanceByStudent).forEach(rec => {
            rec.statuses = rec.statuses.map(s => (s === '-' ? 'H' : s));
        });

        // Determine bolos indicator per student
        let totalBolos = 0;
        const rows = [];
        Object.values(attendanceByStudent).forEach((rec, idx) => {
            let bolos = false;
            const firstStatus = rec.statuses[0] || '-';
            if (firstStatus === 'A') {
                bolos = false;
            } else {
                // if any A in later jams
                for (let i = 1; i < rec.statuses.length; i++) {
                    if (rec.statuses[i] === 'A') {
                        bolos = true; break;
                    }
                }
            }
            if (bolos) totalBolos++;

            // list of subjects for that student (all mapels that occured at active jams)
            const subjectList = Array.from(new Set(activeJams.flatMap(j => Array.from(mapJamToMapel[j] || [])))).filter(Boolean);

            rows.push({ no: idx + 1, name: rec.name, statuses: rec.statuses, subjects: subjectList, bolos });
        });

        // store for PDF export
        lastEvaluasiRows = rows;

        // Render rows
        evaluasiKehadiranTbody.innerHTML = '';
        rows.forEach(r => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid rgba(0,0,0,0.05)';
            const jamCells = r.statuses.map(s => {
                let color = '#94a3b8';
                if (s === 'H') color = '#10b981';
                if (s === 'S') color = '#f59e0b';
                if (s === 'I') color = '#3b82f6';
                if (s === 'A') color = '#ef4444';
                return `<td style="padding:0.25rem 0.5rem; color: ${color}; font-weight: 700;">${s}</td>`;
            }).join('');

            const subjText = r.subjects.length ? r.subjects.join(', ') : '-';
            const bolosText = r.bolos ? '<span style="color: #ef4444; font-weight:800;">YA</span>' : '-';

            tr.innerHTML = `
                <td style="padding: 0.5rem;">${r.no}</td>
                <td style="padding: 0.5rem; text-align: left; font-weight: 600;">${r.name}</td>
                ${jamCells}
                <td style="padding: 0.5rem; text-align: left;">${subjText}</td>
                <td style="padding: 0.5rem;">${bolosText}</td>
            `;
            evaluasiKehadiranTbody.appendChild(tr);
        });

        // Update summary
        evalSummary.innerText = `Total Siswa: ${studentsInClass.length} • Diduga Bolos: ${totalBolos}`;
    }

    // --- SETTINGS LOGIC ---
    if (menuRekapKelas) {
        menuRekapKelas.addEventListener('click', () => {
            renderRekapKelas();
            switchScreen('dashboard-screen', 'rekap-kelas-screen');
        });
    }

    if (backFromRekapKelas) {
        backFromRekapKelas.addEventListener('click', () => {
            switchScreen('rekap-kelas-screen', 'dashboard-screen');
        });
    }

    function renderRekapKelas() {
        if (!rekapKelasContainer) return;
        rekapKelasContainer.innerHTML = '';

        // Get unique classes from studentsData or cached_students
        let masterData = studentsData;
        if (masterData.length === 0) {
            masterData = JSON.parse(localStorage.getItem('cached_students') || '[]');
        }

        const classes = [...new Set(masterData.map(s => s.KELAS))].filter(c => c).sort();

        if (classes.length === 0) {
            rekapKelasContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: span 2; padding: 2rem;">Data kelas belum tersedia.</p>';
            return;
        }

        const today = new Date().toLocaleDateString('en-CA');
        const dayOfWeek = new Date().getDay(); // 0: Sun, 1: Mon, ..., 5: Fri, 6: Sat
        const maxJP = dayOfWeek === 5 ? 8 : 11;
        const jpArray = Array.from({ length: maxJP }, (_, i) => i + 1);

        // Combine live data from sheet and pending local cache
        const allJournals = [
            ...jurnalData,
            ...JSON.parse(localStorage.getItem('cached_jurnals') || '[]')
        ];

        const journalsToday = allJournals.filter(j => j.TANGGAL === today);

        // Stats Summary at top
        const totalPeriods = classes.length * maxJP;
        let filledCount = 0;

        const cardsHTML = classes.map((className, idx) => {
            let classFilled = 0;
            const jpHTML = jpArray.map(jam => {
                const isFilled = journalsToday.some(j => {
                    const jamVal = j.JAM_KE || j.JAM || '';
                    return j.KELAS === className && jamVal.split(',').map(s => s.trim()).includes(String(jam));
                });
                if (isFilled) {
                    filledCount++;
                    classFilled++;
                }
                return `<div class="jp-box ${isFilled ? 'filled' : 'empty'}">${jam}</div>`;
            }).join('');

            return `
                <div class="status-class-card" style="animation-delay: ${idx * 0.05}s">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div class="status-class-name">${className}</div>
                        <div style="font-size: 0.6rem; color: var(--text-muted); font-weight: 700;">${classFilled}/${maxJP}</div>
                    </div>
                    <div class="jp-grid" style="grid-template-columns: repeat(${maxJP > 10 ? 6 : 4}, 1fr);">${jpHTML}</div>
                </div>
            `;
        }).join('');

        const percent = Math.round((filledCount / totalPeriods) * 100) || 0;

        rekapKelasContainer.innerHTML = `
            <div style="grid-column: span 2; background: var(--primary); border-radius: 20px; padding: 1.25rem; color: white; display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2);">
                <div>
                    <div style="font-size: 0.75rem; opacity: 0.8; font-weight: 600;">Persentase Terisi Hari Ini</div>
                    <div style="font-size: 1.75rem; font-weight: 800;">${percent}%</div>
                </div>
                <div style="font-size: 2.5rem; opacity: 0.3;">📊</div>
            </div>
            ${cardsHTML}
        `;
    }

    if (menuSettings) {
        menuSettings.addEventListener('click', () => {
            switchScreen('dashboard-screen', 'settings-screen');
        });
    }

    if (backFromSettings) {
        backFromSettings.addEventListener('click', () => {
            switchScreen('settings-screen', 'dashboard-screen');
        });
    }

    if (btnClearCache) {
        btnClearCache.addEventListener('click', () => {
            clearJournalCache();
        });
    }

    if (btnChangePasswordSettings) {
        btnChangePasswordSettings.addEventListener('click', () => {
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            localStorage.setItem('pendingUser', JSON.stringify(userData));
            switchScreen('settings-screen', 'change-password-screen');
        });
    }

    const btnSaveTarget = document.getElementById('btn-save-target');
    if (btnSaveTarget) {
        btnSaveTarget.addEventListener('click', async () => {
            if (!navigator.onLine) {
                showToast('Fitur ini membutuhkan koneksi internet', 'error');
                return;
            }

            const inputTargetEntri = document.getElementById('input-target-entri');
            const newTarget = parseInt(inputTargetEntri.value, 10);
            if (isNaN(newTarget) || newTarget < 1) {
                showToast('Target harus berupa angka valid (min. 1)', 'error');
                return;
            }

            btnSaveTarget.disabled = true;
            btnSaveTarget.innerText = '⌛';

            try {
                const user = JSON.parse(localStorage.getItem('userData') || '{}');

                const payload = {
                    type: 'UPDATE_TARGET',
                    kodeGuru: user.NIP || user.KODEGURU || user.NAMA,
                    target: newTarget
                };

                // Use the global UPLOAD_API_URL or the endpoint that handles logins
                const endpoint = typeof UPLOAD_API_URL !== 'undefined' ? UPLOAD_API_URL : 'https://script.google.com/macros/s/AKfycbz_4hH8c9yT7b_g/exec';

                await fetch(endpoint, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(payload)
                });

                // With no-cors, we assume success
                user.TARGET_ENTRI = newTarget;
                localStorage.setItem('userData', JSON.stringify(user));
                showToast('✅ Target berhasil diperbarui!', 'success');
                updateDashboard(user); // Update UI
            } catch (error) {
                console.error('Error saving target:', error);
                // Allow local fallback for now so UI works immediately
                const user = JSON.parse(localStorage.getItem('userData') || '{}');
                user.TARGET_ENTRI = newTarget;
                localStorage.setItem('userData', JSON.stringify(user));
                showToast('Target disimpan lokal (Koneksi error/CORS)', 'warning');
                updateDashboard(user);
            } finally {
                btnSaveTarget.disabled = false;
                btnSaveTarget.innerText = '💾';
            }
        });
    }

    // Siswa Izin Logic
    if (menuIzinSiswa) {
        menuIzinSiswa.addEventListener('click', () => {
            if (typeof window.refreshBackgroundData === 'function') window.refreshBackgroundData();
            renderSiswaIzinList();
            switchScreen('dashboard-screen', 'siswa-izin-list-screen');
        });
    }

    if (backFromIzinList) {
        backFromIzinList.addEventListener('click', () => {
            switchScreen('siswa-izin-list-screen', 'dashboard-screen');
        });
    }

    if (btnAddIzin) {
        btnAddIzin.addEventListener('click', () => {
            initIzinForm();
            switchScreen('siswa-izin-list-screen', 'siswa-izin-screen');
        });
    }

    if (siswaIzinListContainer) {
        siswaIzinListContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-delete-izin');
            if (!btn) return;
            const id = btn.getAttribute('data-id');
            if (!id) return;
            if (confirm('Apakah Anda yakin ingin menghapus data izin ini?')) {
                deleteSiswaIzin(id);
            }
        });
    }

    if (backFromSiswaIzin) {
        backFromSiswaIzin.addEventListener('click', () => {
            if (cameraStream) stopCamera();
            switchScreen('siswa-izin-screen', 'siswa-izin-list-screen');
        });
    }

    function renderSiswaIzinList() {
        siswaIzinListContainer.innerHTML = '';
        const cached = JSON.parse(localStorage.getItem('cached_siswa_izin') || '[]');

        const now = new Date();
        const todayStr = now.toLocaleDateString('en-CA');

        let serverData = window.siswaIzinData || [];
        // Map server data to match structure
        serverData = serverData.map(s => ({
            ...s,
            ID: `server-${s.NIS}-${s.TANGGAL}`
        })).filter(s => {
            const dbDate = (s.TANGGAL || '').trim();
            return dbDate.includes(todayStr); // Only show today's server data
        });

        // Combine local cached and server data (avoid duplicates based on NIS and Date)
        const combined = [...cached];
        serverData.forEach(sd => {
            const exists = combined.find(c => c.NIS === sd.NIS && c.TANGGAL === sd.TANGGAL);
            if (!exists) combined.push(sd);
        });

        if (combined.length === 0) {
            siswaIzinListContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem 1rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.2;">✉️</div>
                    <p style="color: var(--text-muted); font-size: 0.875rem;">Belum ada data siswa izin hari ini.</p>
                </div>
            `;
            return;
        }

        // Sort by time (newest first)
        const sorted = combined.reverse();

        sorted.forEach(item => {
            const card = document.createElement('div');
            card.className = 'izin-card';

            const color = item.KETERANGAN === 'Sakit' ? '#ef4444' : '#f59e0b';
            const bg = item.KETERANGAN === 'Sakit' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)';
            const deleteId = item.ID || (item.NIS && item.TANGGAL ? `server-${item.NIS}-${item.TANGGAL}` : '');

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                    <div class="card-title">${item.NAMA_SISWA}</div>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <div style="font-size: 0.65rem; font-weight: 800; padding: 4px 10px; background: ${bg}; color: ${color}; border-radius: 6px; text-transform: uppercase;">${item.KETERANGAN}</div>
                        <button class="btn-delete-izin" data-id="${deleteId}" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; padding: 0.2rem; color: #94a3b8; transition: color 0.2s;">🗑️</button>
                    </div>
                </div>
                <div class="card-meta">
                    <div><span style="color: var(--text-muted);">Kelas:</span> <span class="card-detail">${item.KELAS}</span></div>
                    <div><span style="color: var(--text-muted);">NIS:</span> <span class="card-detail">${item.NIS}</span></div>
                    <div style="grid-column: span 2;"><span style="color: var(--text-muted);">Dicatat Oleh:</span> <span class="card-detail">${item.GURU_BK || 'Guru BK'}</span></div>
                </div>
                <div style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.4rem;">
                    <span>📅</span> <span>${formatDateIndo(item.TANGGAL)}</span>
                </div>
            `;
            siswaIzinListContainer.appendChild(card);
        });

    }

    async function deleteSiswaIzin(id) {
        let nis = '';
        let tanggal = '';
        let isServerDelete = false;

        if (String(id).startsWith('server-')) {
            const parts = id.split('-');
            nis = parts[1];
            tanggal = parts.slice(2).join('-');
            isServerDelete = true;
        } else {
            // It is a local numeric ID, let's get the permit details from cache
            const cached = JSON.parse(localStorage.getItem('cached_siswa_izin') || '[]');
            const localItem = cached.find(item => String(item.ID) === String(id));
            if (localItem) {
                nis = localItem.NIS;
                tanggal = localItem.TANGGAL;

                // Check if this item is also present in server data
                const existsOnServer = (window.siswaIzinData || []).some(
                    s => String(s.NIS) === String(nis) && String(s.TANGGAL) === String(tanggal)
                );
                if (existsOnServer) {
                    isServerDelete = true;
                }
            }
        }

        // Always remove from local cache immediately
        let cached = JSON.parse(localStorage.getItem('cached_siswa_izin') || '[]');
        if (String(id).startsWith('server-') || (nis && tanggal)) {
            cached = cached.filter(item => !(String(item.NIS) === String(nis) && String(item.TANGGAL) === String(tanggal)));
        } else {
            cached = cached.filter(item => String(item.ID) !== String(id));
        }
        localStorage.setItem('cached_siswa_izin', JSON.stringify(cached));

        // Always remove from global array immediately for fast UI feedback
        if (nis && tanggal) {
            window.siswaIzinData = (window.siswaIzinData || []).filter(s => !(String(s.NIS) === String(nis) && String(s.TANGGAL) === String(tanggal)));
        }

        if (isServerDelete && nis && tanggal) {
            showToast('⌛ Menghapus data di server...', 'info');
            try {
                // Find full cached or global permit details to form a complete and robust payload
                const permit = (window.siswaIzinData || []).find(
                    s => String(s.NIS) === String(nis) && String(s.TANGGAL) === String(tanggal)
                );

                let tanggalIndo = '';
                let tanggalStrip = '';
                if (tanggal && tanggal.includes('-')) {
                    const p = tanggal.split('-');
                    if (p.length === 3) {
                        tanggalIndo = `${p[2]}/${p[1]}/${p[0]}`; // e.g. "18/05/2026"
                        tanggalStrip = `${p[2]}-${p[1]}-${p[0]}`; // e.g. "18-05-2026"
                    }
                }

                const payload = {
                    type: 'DELETE_IZIN',
                    NIS: Number(nis),
                    nis: nis,
                    TANGGAL: tanggal,
                    tanggal: tanggal,
                    TANGGAL_INDO: tanggalIndo,
                    TANGGAL_STRIP: tanggalStrip,
                    tanggal_indo: tanggalIndo,
                    tanggal_strip: tanggalStrip
                };

                if (permit) {
                    Object.assign(payload, permit);
                    payload.type = 'DELETE_IZIN'; // Ensure correct operation type
                    payload.NIS = Number(permit.NIS || nis);
                    payload.nis = String(permit.NIS || nis);
                    payload.TANGGAL = permit.TANGGAL || tanggal;
                    payload.tanggal = permit.TANGGAL || tanggal;
                    if (permit.ID) {
                        payload.ID = Number(permit.ID);
                        payload.id = Number(permit.ID);
                    }
                }

                const response = await fetch(UPLOAD_API_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(payload)
                });
                showToast('✅ Data berhasil dihapus dari server.', 'success');
            } catch (err) {
                console.error('Delete Error:', err);
                showAlert('❌ Gagal Hapus', 'Koneksi ke server bermasalah.', 'error');
                return;
            }
        } else {
            showToast('🗑️ Data Izin lokal berhasil dihapus.', 'info');
        }

        renderSiswaIzinList();
    }

    function initIzinForm() {
        siswaIzinForm.reset();
        izinCapturedPhotoData = null;
        izinCapturedImg.style.display = 'none';
        retakePhotoIzin.style.display = 'none';
        inputIzinNIS.value = '';

        const now = new Date();
        izinTanggalDisplay.innerText = formatDateIndo(now.toLocaleDateString('en-CA'));

        // Fill Classes
        const classes = [...new Set(studentsData.map(s => s.KELAS))].sort();
        selectIzinKelas.innerHTML = '<option value="">Pilih Kelas...</option>' +
            classes.map(c => `<option value="${c}">${c}</option>`).join('');

        selectIzinSiswa.innerHTML = '<option value="">Pilih Siswa...</option>';
        selectIzinSiswa.disabled = true;
    }

    selectIzinKelas?.addEventListener('change', () => {
        const kelas = selectIzinKelas.value;
        if (kelas) {
            const studentsInClass = studentsData.filter(s => s.KELAS === kelas && (s.NAMA_PESERTA_DIDIK || s.NAMA || '').trim() !== '').sort((a, b) => {
                const nameA = (a.NAMA_PESERTA_DIDIK || a.NAMA || '').toUpperCase();
                const nameB = (b.NAMA_PESERTA_DIDIK || b.NAMA || '').toUpperCase();
                return nameA.localeCompare(nameB);
            });

            selectIzinSiswa.innerHTML = '<option value="">Pilih Siswa...</option>' +
                studentsInClass.map(s => `<option value="${s.NAMA_PESERTA_DIDIK || s.NAMA}">${s.NAMA_PESERTA_DIDIK || s.NAMA}</option>`).join('');
            selectIzinSiswa.disabled = false;
        } else {
            selectIzinSiswa.innerHTML = '<option value="">Pilih Siswa...</option>';
            selectIzinSiswa.disabled = true;
            inputIzinNIS.value = '';
        }
    });

    selectIzinSiswa?.addEventListener('change', () => {
        const nama = selectIzinSiswa.value;
        const student = studentsData.find(s => (s.NAMA_PESERTA_DIDIK || s.NAMA) === nama);
        if (student) {
            inputIzinNIS.value = student.NIS || student.NISN || '';
        } else {
            inputIzinNIS.value = '';
        }
    });

    openCameraIzin?.addEventListener('click', () => {
        currentCameraTarget = 'izin';
        startCamera();
    });

    retakePhotoIzin?.addEventListener('click', () => {
        currentCameraTarget = 'izin';
        startCamera();
    });

    if (siswaIzinForm) {
        siswaIzinForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = siswaIzinForm.querySelector('button[type="submit"]');
            const kelas = selectIzinKelas.value;
            const nama = selectIzinSiswa.value;
            const nis = inputIzinNIS.value;
            const keterangan = document.getElementById('izin-keterangan').value;

            const now = new Date();
            const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
            const savedUser = JSON.parse(localStorage.getItem('userData') || '{}');

            const izinData = {
                ID: Date.now(),
                TANGGAL: now.toLocaleDateString('en-CA'),
                HARI: days[now.getDay()],
                KELAS: kelas,
                NAMA_SISWA: nama,
                NIS: nis,
                KETERANGAN: keterangan,
                DOKUMENTASI_IZIN: izinCapturedPhotoData || '',
                GURU_BK: savedUser.NAMA || 'Guru BK'
            };

            submitBtn.disabled = true;
            submitBtn.innerText = 'Menyimpan...';

            try {
                const cached = JSON.parse(localStorage.getItem('cached_siswa_izin') || '[]');
                cached.push(izinData);
                localStorage.setItem('cached_siswa_izin', JSON.stringify(cached));

                showToast('✅ Data Izin tersimpan.', 'success');
                setTimeout(() => {
                    renderSiswaIzinList();
                    switchScreen('siswa-izin-screen', 'siswa-izin-list-screen');
                    if (navigator.onLine) syncOfflineData();
                }, 1500);
            } catch (err) {
                console.error('Izin Submit Error:', err);
                showAlert('❌ Gagal Simpan', 'Kesalahan: ' + err.message, 'error');
                submitBtn.disabled = false;
                submitBtn.innerText = 'Simpan Data Izin';
            }
        });
    }

    // Handle Logout
    logoutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Clear Session
        localStorage.removeItem('isLoggedIn');

        dashboardScreen.classList.remove('active');
        dashboardScreen.classList.add('hidden');
        profileDropdown.classList.add('hidden');

        loginScreen.classList.remove('hidden');
        loginScreen.classList.add('active');

        // Clear form fields
        loginForm.reset();
    });

    // Profile Dropdown Logic
    avatarBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
    });

    btnChangePhoto?.addEventListener('click', (e) => {
        e.stopPropagation();
        showToast('Fitur akan segera hadir!', 'info');
        profileDropdown.classList.remove('active');
    });

    // Close dropdown on outside click
    document.addEventListener('click', () => {
        profileDropdown?.classList.remove('active');
    });

    // Connectivity Monitoring
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    async function syncOfflineData() {
        if (!navigator.onLine || !UPLOAD_API_URL) return;

        const caches = [
            { key: 'cached_jurnals', label: 'Jurnal' },
            { key: 'cached_literasi', label: 'Literasi' },
            { key: 'cached_piket', label: 'Piket' },
            { key: 'cached_siswa_izin', label: 'Siswa Izin' }
        ];

        for (const cache of caches) {
            let items = JSON.parse(localStorage.getItem(cache.key) || '[]');
            if (items.length === 0) continue;

            console.log(`Syncing ${items.length} items from ${cache.label}...`);

            const nextItems = [];
            const now = Date.now();

            for (const item of items) {
                // Keep successfully synced items for 3 minutes to prevent disappearing on refresh
                if (item.SYNC_STATUS === 'SUCCESS') {
                    if (item.SYNC_TIME && (now - item.SYNC_TIME < 180000)) {
                        nextItems.push(item);
                    }
                    continue;
                }

                try {
                    // Inject 'type' field dynamically if the server relies on it to route to the correct sheet
                    const payload = { ...item };
                    if (!payload.type) {
                        if (cache.label === 'Jurnal') payload.type = 'JURNAL';
                        else if (cache.label === 'Literasi') payload.type = 'LITERASI';
                        else if (cache.label === 'Piket') payload.type = 'PIKET';
                        else if (cache.label === 'Siswa Izin') payload.type = 'SISWA_IZIN';
                    }

                    // Prepend single quote to JAM_KE to prevent Google Sheets from auto-converting to date
                    if (cache.label === 'Jurnal' && payload.JAM_KE) {
                        const jamStr = payload.JAM_KE.toString();
                        if (!jamStr.startsWith("'")) {
                            payload.JAM_KE = "'" + jamStr;
                        }
                    }

                    await fetch(UPLOAD_API_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: JSON.stringify(payload)
                    });

                    console.log(`✅ ${cache.label} terkirim`);

                    item.SYNC_STATUS = 'SUCCESS';
                    item.SYNC_TIME = now;
                    nextItems.push(item);
                } catch (err) {
                    console.error(`❌ Sync error (${cache.label}):`, err);
                    nextItems.push(item);
                }
            }
            localStorage.setItem(cache.key, JSON.stringify(nextItems));
        }

        // Trigger background refresh
        if (typeof window.refreshBackgroundData === 'function') {
            window.refreshBackgroundData();
        }

        updateSyncStatus();
    }

    async function syncProfilePhoto(photoData) {
        if (!navigator.onLine || !UPLOAD_API_URL) return;

        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const kodeGuru = userData.NIP || userData.KODEGURU;

        if (!kodeGuru) return;

        try {
            showToast('⌛ Mensinkronkan Foto Profil...', 'info');
            await fetch(UPLOAD_API_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    type: 'UPDATE_PROFIL',
                    kodeGuru: kodeGuru,
                    photo: photoData
                })
            });
            console.log('✓ Foto profil berhasil dikirim ke server');
        } catch (err) {
            console.error('❌ Gagal sync foto profil:', err);
        }
    }

    async function syncNewPassword(newPassword) {
        if (!navigator.onLine || !UPLOAD_API_URL) return;

        let userData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (!userData.NIP) userData = JSON.parse(localStorage.getItem('pendingUser') || '{}');

        const kodeGuru = userData.NIP || userData.KODEGURU;
        if (!kodeGuru) return;

        try {
            showToast('⌛ Mensinkronkan Password...', 'info');
            await fetch(UPLOAD_API_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    type: 'UPDATE_PASSWORD',
                    kodeGuru: kodeGuru,
                    newPassword: newPassword
                })
            });
            console.log('✓ Password berhasil dikirim ke server');
        } catch (err) {
            console.error('❌ Gagal sync password:', err);
        }
    }

    function updateOnlineStatus() {
        if (navigator.onLine) {
            document.body.classList.remove('offline-mode');
            const statusBadge = document.getElementById('online-status-badge');
            if (statusBadge) {
                statusBadge.innerText = 'Online';
                statusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
                statusBadge.style.color = '#10b981';
            }
        } else {
            document.body.classList.add('offline-mode');
            const statusBadge = document.getElementById('online-status-badge');
            if (statusBadge) {
                statusBadge.innerText = 'Offline';
                statusBadge.style.background = 'rgba(239, 68, 68, 0.2)';
                statusBadge.style.color = '#ef4444';
            }
            showToast('⚠️ Koneksi Terputus. Anda masuk ke Mode Offline.', 'warning');
        }
    }
});
