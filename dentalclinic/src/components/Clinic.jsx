import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Phone, Mail, Shield, Award, Clock, Star, CheckCircle, Sparkles, Users, Heart, Calendar, MessageSquare, X, Play, Globe } from 'lucide-react';
import translations from '../translations/languages.json';

const DentalClinicApp = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [patientForm, setPatientForm] = useState({
        name: '',
        surname: '',
        phone: '',
        email: ''
    });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [countdown, setCountdown] = useState(null);
    const [currentClinicPhotoIndex, setCurrentClinicPhotoIndex] = useState(0);
    const [currentLang, setCurrentLang] = useState('tr');
    const [isScrolled, setIsScrolled] = useState(false);
    const videoRef = useRef(null);
    const fileInputRef = useRef(null);

    const t = translations[currentLang];

    const languages = [
        { code: 'tr', name: 'Türkçe' },
        { code: 'en', name: 'English' },
        { code: 'ar', name: 'العربية' },
        { code: 'ru', name: 'Русский' }
    ];

    // Klinik resimleri ve hekim bilgileri
    const clinicPhotos = [
        'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1200',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200',
        'https://images.unsplash.com/photo-1629909615486-b11f5530ca71?w=1200',
        'https://images.unsplash.com/photo-1629909613886-d3a77e2bc350?w=1200'
    ];

    const doctors = [
        {
            name: 'Prof. Dr. Ahmet Yılmaz',
            title: 'Ağız, Diş ve Çene Cerrahisi Uzmanı',
            photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
            experience: '25 yıl deneyim',
            education: 'Harvard Üniversitesi'
        },
        {
            name: 'Dr. Ayşe Kaya',
            title: 'Ortodonti Uzmanı',
            photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
            experience: '15 yıl deneyim',
            education: 'Oxford Üniversitesi'
        },
        {
            name: 'Dr. Mehmet Demir',
            title: 'Estetik Diş Hekimi',
            photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
            experience: '20 yıl deneyim',
            education: 'Stanford Üniversitesi'
        }
    ];

    // Görsel slayt gösterisi
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % clinicPhotos.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Geri sayım efekti
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // Add RTL support
    useEffect(() => {
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    }, [currentLang]);

    // Add scroll listener
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 100;
            setIsScrolled(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImage(e.target.result);
                simulateAnalysis();
            };
            reader.readAsDataURL(file);
        }
    };

    const simulateAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            const randomTartar = Math.floor(Math.random() * 40) + 20;
            const randomYellowing = Math.floor(Math.random() * 50) + 25;
            const randomGumHealth = Math.floor(Math.random() * 30) + 70;

            setAnalysisResult({
                tartarLevel: randomTartar,
                yellowingLevel: randomYellowing,
                gumHealth: randomGumHealth,
                recommendation: randomTartar > 50 ?
                    '🚨 ACIL: Yüksek tartar seviyesi tespit edildi! Hemen profesyonel temizlik gerekli. %50 İNDİRİM fırsatını kaçırmayın!' :
                    '✅ Tartar seviyesi kontrol altında. Koruyucu bakım için özel indirimlerimizden yararlanın!'
            });
            setIsAnalyzing(false);
            setCountdown(300); // 5 dakika geri sayım
        }, 3000);
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setShowCamera(true);
            }
        } catch (err) {
            console.error("Kamera erişimi hatası:", err);
            alert("Kamera erişimi için izin vermeniz gerekiyor. Lütfen tarayıcı ayarlarınızı kontrol edin.");
        }
    };

    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
            const image = canvas.toDataURL('image/jpeg');
            setUploadedImage(image);
            setShowCamera(false);
            simulateAnalysis();

            // Kamera akışını durdur
            const stream = videoRef.current.srcObject;
            stream.getTracks().forEach(track => track.stop());
        }
    };

    const handleFormSubmit = () => {
        if (patientForm.name && patientForm.surname && patientForm.phone && patientForm.email) {
            alert('🎉 TEBRİKLER! Ücretsiz konsültasyon talebiniz alındı. Uzmanlarımız 15 dakika içinde sizi arayacak!');
            setPatientForm({ name: '', surname: '', phone: '', email: '' });
        } else {
            alert('⚠️ Ücretsiz konsültasyon için lütfen tüm alanları eksiksiz doldurun.');
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const renderLanguageSelector = () => (
        <div className="fixed bottom-6 left-6 z-50">
            <div className="relative group">
                <button className="flex items-center gap-2 bg-white shadow-lg px-4 py-2 rounded-full text-gray-700 hover:bg-gray-50 transition-all">
                    <Globe className="w-4 h-4" />
                    <span>{languages.find(lang => lang.code === currentLang)?.name}</span>
                </button>
                <div className="absolute left-0 bottom-full mb-2 w-40 py-2 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            onClick={() => setCurrentLang(lang.code)}
                            className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${currentLang === lang.code ? 'text-blue-600 font-bold' : 'text-gray-700'
                                }`}
                        >
                            {lang.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 ${currentLang === 'ar' ? 'font-arabic' : ''
            }`}>
            {renderLanguageSelector()}
            {/* Üst Bar - Aciliyet Yaratma */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-center py-3 relative overflow-hidden">
                <div className="animate-pulse">
                    <span className="inline-block mr-2 transform -rotate-12">💫</span>
                    {t.header.special_offer}
                    <span className="inline-block ml-2 transform rotate-12">💫</span>
                </div>
                <div className="text-xs font-medium text-red-100 mt-1">
                    {t.header.hurry}
                </div>
            </div>

            {/* Yeni Modern Header */}
            <header className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>

                <div className="container mx-auto px-4 py-6 relative">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Logo ve Marka */}
                        <div className="flex items-center gap-4">
                            <div className="bg-white/10 backdrop-blur-lg p-3 rounded-2xl">
                                <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-xl">
                                    <Sparkles className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                                    {t.header.clinic_name}
                                </h1>
                                <div className="flex items-center gap-2 text-blue-100 mt-1">
                                    <Shield className="w-4 h-4" />
                                    <span className="text-sm">{t.header.clinic_subtitle}</span>
                                </div>
                            </div>
                        </div>

                        {/* İletişim ve CTA */}
                        <div className="flex items-center gap-6">
                            {/* İletişim Bilgileri */}
                            <div className="hidden md:block">
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 text-white">
                                            <Phone className="w-4 h-4 text-cyan-300" />
                                            <span className="text-xl font-bold">0212 123 45 67</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-cyan-200 text-sm mt-1">
                                            <CheckCircle className="w-3 h-3" />
                                            <span>7/24 Hizmet</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-6 py-3 rounded-full font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Randevu Al
                            </button>
                        </div>
                    </div>

                    {/* Alt Bilgi Çubuğu */}
                    <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap justify-center md:justify-start gap-6 text-sm text-white">
                        <div className="flex items-center gap-2">
                            <div className="bg-green-500/20 p-1 rounded">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                            </div>
                            <span>FDA Onaylı AI Teknolojisi</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-500/20 p-1 rounded">
                                <Shield className="w-4 h-4 text-blue-400" />
                            </div>
                            <span>%100 Memnuniyet Garantisi</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-purple-500/20 p-1 rounded">
                                <Award className="w-4 h-4 text-purple-400" />
                            </div>
                            <span>15.000+ Mutlu Hasta</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Klinik Fotoğrafları Carousel */}
            <section className="relative h-[600px] overflow-hidden">
                {clinicPhotos.map((photo, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentClinicPhotoIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={photo}
                            alt={`Klinik görünüm ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                    </div>
                ))}

                {/* Carousel Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {clinicPhotos.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentClinicPhotoIndex
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/75'
                                }`}
                            onClick={() => setCurrentClinicPhotoIndex(index)}
                        />
                    ))}
                </div>
            </section>

            {/* Uzman Hekimlerimiz */}
            <section className="py-20 bg-gradient-to-b from-white to-cyan-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
                        Uzman Hekimlerimiz
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        Alanında uzman, deneyimli ve güler yüzlü hekim kadromuzla
                        sizlere en iyi hizmeti sunuyoruz.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {doctors.map((doctor, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                            >
                                <div className="relative mb-6">
                                    <img
                                        src={doctor.photo}
                                        alt={doctor.name}
                                        className="w-full h-64 object-cover rounded-xl"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">{doctor.name}</h3>
                                <p className="text-cyan-600 font-semibold mb-4">{doctor.title}</p>
                                <div className="space-y-2 text-gray-600">
                                    <p className="flex items-center gap-2">
                                        <Award className="w-5 h-5 text-cyan-500" />
                                        {doctor.experience}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-cyan-500" />
                                        {doctor.education}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ana İçerik */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Sol Taraf - Kamera ve Analiz */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                                📸 Anında AI Diş Analizi
                            </h2>

                            {!showCamera && !uploadedImage && (
                                <div className="space-y-6">
                                    <div
                                        onClick={startCamera}
                                        className="border-2 border-dashed border-cyan-300 rounded-xl p-8 text-center cursor-pointer hover:border-cyan-500 transition-all bg-cyan-50"
                                    >
                                        <div className="bg-cyan-100 rounded-full p-8 w-24 h-24 flex items-center justify-center mx-auto mb-4">
                                            <Camera className="w-8 h-8 text-cyan-600" />
                                        </div>
                                        <p className="text-lg font-semibold text-gray-800 mb-2">
                                            Kamerayı Başlat
                                        </p>
                                        <p className="text-cyan-600 text-sm">
                                            30 saniyede profesyonel AI analizi
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-gray-500 mb-4">veya</p>
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all"
                                        >
                                            <Upload className="w-5 h-5 inline mr-2" />
                                            Fotoğraf Yükle
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-8">
                                        <div className="bg-cyan-50 p-4 rounded-xl">
                                            <div className="font-bold text-cyan-800 mb-1">%99</div>
                                            <div className="text-sm text-cyan-600">Doğruluk Oranı</div>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-xl">
                                            <div className="font-bold text-blue-800 mb-1">30 sn</div>
                                            <div className="text-sm text-blue-600">Analiz Süresi</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {showCamera && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            className="w-full rounded-lg border-4 border-cyan-200"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center bg-black/50 p-4 rounded-lg text-white">
                                                <p>Dişlerinizi göstererek gülümseyin</p>
                                                <p className="text-sm">En iyi sonuç için iyi aydınlatma kullanın</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center gap-4">
                                        <button
                                            onClick={captureImage}
                                            className="bg-cyan-600 text-white px-6 py-3 rounded-full hover:bg-cyan-700"
                                        >
                                            <Camera className="w-5 h-5 inline mr-2" />
                                            Fotoğraf Çek
                                        </button>
                                        <button
                                            onClick={() => setShowCamera(false)}
                                            className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600"
                                        >
                                            İptal
                                        </button>
                                    </div>
                                </div>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>

                        {/* Sağ Taraf - Form */}
                        <div className="bg-gradient-to-b from-cyan-50 to-white rounded-2xl p-8 shadow-xl">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                    🎯 Ücretsiz Analiz Sonucu
                                </h2>
                                <p className="text-cyan-600">
                                    Hemen şimdi AI diş analizinizi alın!
                                </p>
                            </div>

                            {uploadedImage && (
                                <div className="mb-8">
                                    <img
                                        src={uploadedImage}
                                        alt="Yüklenen Diş Fotoğrafı"
                                        className="w-full h-auto rounded-lg shadow-md"
                                    />
                                </div>
                            )}

                            {isAnalyzing ? (
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
                                    <div className="animate-spin mx-auto mb-4">
                                        <Sparkles className="w-16 h-16 text-blue-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">AI Analiz Ediliyor...</h3>
                                    <p className="text-gray-600">Profesyonel analiz sonuçlarınız hazırlanıyor</p>
                                    <div className="mt-4 bg-white rounded-full h-2 overflow-hidden">
                                        <div className="bg-blue-600 h-full animate-pulse" style={{ width: '70%' }}></div>
                                    </div>
                                </div>
                            ) : analysisResult && (
                                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 shadow-2xl">
                                    {/* Geri Sayım Timer */}
                                    {countdown && (
                                        <div className="bg-red-600 text-white text-center py-3 rounded-lg mb-6">
                                            <div className="text-2xl font-bold">
                                                ⏰ ÖNERİLERİMİZ {formatTime(countdown)} SÜRE GEÇERLI!
                                            </div>
                                            <div className="text-sm">Bu süre sonunda %50 indirim sona erecek!</div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                        <div className="bg-white rounded-xl p-6 shadow-lg">
                                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                🦷 Tartar Seviyesi
                                            </h3>
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-full bg-gray-200 rounded-full h-3">
                                                    <div
                                                        className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all duration-1000"
                                                        style={{ width: `${analysisResult.tartarLevel}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-lg font-bold text-orange-600">
                                                    {analysisResult.tartarLevel}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-xl p-6 shadow-lg">
                                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                💛 Sarılık Seviyesi
                                            </h3>
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-full bg-gray-200 rounded-full h-3">
                                                    <div
                                                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-1000"
                                                        style={{ width: `${analysisResult.yellowingLevel}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-lg font-bold text-yellow-600">
                                                    {analysisResult.yellowingLevel}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-xl p-6 shadow-lg">
                                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                💗 Diş Eti Sağlığı
                                            </h3>
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-full bg-gray-200 rounded-full h-3">
                                                    <div
                                                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000"
                                                        style={{ width: `${analysisResult.gumHealth}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-lg font-bold text-green-600">
                                                    {analysisResult.gumHealth}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl p-6 shadow-lg">
                                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                            👨‍⚕️ Uzman Önerileri
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed text-lg mb-4">
                                            {analysisResult.recommendation}
                                        </p>
                                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                                            <div className="text-yellow-800 font-semibold">
                                                💰 ÖZEL FIRSAT: Bugün randevu alanlara %50 indirim!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* İletişim Formu */}
                            <div className="mt-8">
                                <h3 className="text-xl font-bold mb-4 text-gray-800">
                                    📞 Ücretsiz Konsültasyon Talep Edin
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Uzmanlarımız 15 dakika içinde sizi arayacak!
                                </p>

                                <div className="bg-white rounded-2xl p-6 shadow-md">
                                    <div className="text-gray-800 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Ad *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={patientForm.name}
                                                    onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Adınız"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Soyad *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={patientForm.surname}
                                                    onChange={(e) => setPatientForm({ ...patientForm, surname: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Soyadınız"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Telefon *
                                            </label>
                                            <input
                                                type="tel"
                                                value={patientForm.phone}
                                                onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="0532 123 45 67"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                E-posta *
                                            </label>
                                            <input
                                                type="email"
                                                value={patientForm.email}
                                                onChange={(e) => setPatientForm({ ...patientForm, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="ornek@email.com"
                                            />
                                        </div>

                                        <button
                                            onClick={handleFormSubmit}
                                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-bold text-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all shadow-2xl"
                                        >
                                            <Calendar className="w-6 h-6 inline mr-2" />
                                            HEMEN RANDEVU AL - %50 İNDİRİM
                                        </button>

                                        <div className="text-center pt-4">
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div className="bg-green-100 text-green-800 p-3 rounded-lg">
                                                    <div className="font-bold">✓ Ücretsiz</div>
                                                    <div className="text-sm">Konsültasyon</div>
                                                </div>
                                                <div className="bg-blue-100 text-blue-800 p-3 rounded-lg">
                                                    <div className="font-bold">✓ %50</div>
                                                    <div className="text-sm">İndirim</div>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm">
                                                📞 15 dakika içinde uzmanlarımız sizi arayacak
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Özellikler Bölümü */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        🏆 Neden Bizi Tercih Ediyorlar?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-center mb-4">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    FDA Onaylı AI
                                </h3>
                                <p className="text-gray-600">
                                    Dünya standartlarında %99 doğruluk oranı
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-center mb-4">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    15,000+ Hasta
                                </h3>
                                <p className="text-gray-600">
                                    Mutlu hastalarımızın güvenini kazandık
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-center mb-4">
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Clock className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    30 Saniye
                                </h3>
                                <p className="text-gray-600">
                                    Anında profesyonel analiz sonucu
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-center mb-4">
                                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="w-8 h-8 text-yellow-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Türkiye'nin En İyisi
                                </h3>
                                <p className="text-gray-600">
                                    Ödüllü teknoloji ve uzman kadro
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sosyal Kanıt */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        💬 Hastalarımız Ne Diyor?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">
                                ""AI analiz gerçekten çok etkileyici! Dişlerimin durumunu anında öğrendim ve hemen randevu aldım. %50 indirim de çok güzeldi."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                    AY
                                </div>
                                <div>
                                    <div className="font-semibold">Ayşe Yılmaz</div>
                                    <div className="text-sm text-gray-500">İstanbul</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">
                                "Kamera özelliği harika! Evden çıkmadan diş kontrolü yaptırdım. Sonuçlar çok detaylı ve profesyonel."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                    MK
                                </div>
                                <div>
                                    <div className="font-semibold">Mehmet Kaya</div>
                                    <div className="text-sm text-gray-500">Ankara</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">
                                "15 dakika içinde aradılar ve randevu verdiler. Hizmet kalitesi mükemmel, teknoloji çok gelişmiş."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                    SO
                                </div>
                                <div>
                                    <div className="font-semibold">Sema Özkan</div>
                                    <div className="text-sm text-gray-500">İzmir</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gülüş Tasarımı Bölümü */}
            <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1920')] opacity-20 bg-cover bg-center"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-5xl font-bold mb-6">
                        ✨ Hayalinizdeki Gülümsemeye Kavuşun!
                    </h2>
                    <p className="text-2xl mb-12 text-cyan-100">
                        Premium diş bakımı ile mükemmel gülüşünüze kavuşun
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-all">
                            <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Hollywood Gülüşü</h3>
                            <p className="text-cyan-100">Porselen lamina ile kusursuz beyazlık</p>
                            <div className="mt-4 text-3xl font-bold text-yellow-400">%40 İndirim</div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-all">
                            <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Dijital Gülüş</h3>
                            <p className="text-cyan-100">3D tasarım ile mükemmel uyum</p>
                            <div className="mt-4 text-3xl font-bold text-yellow-400">12 Taksit</div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-all">
                            <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Premium Paket</h3>
                            <p className="text-cyan-100">Ömür boyu garanti & bakım</p>
                            <div className="mt-4 text-3xl font-bold text-yellow-400">VIP Hizmet</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-white/10 to-white/20 p-8 rounded-2xl backdrop-blur-lg max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4">🎁 Özel Hediye Paketi</h3>
                        <ul className="text-left space-y-3 mb-6">
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span>Ücretsiz Diş Beyazlatma (1.500₺ değerinde)</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span>Premium Ağız Bakım Seti (900₺ değerinde)</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span>2 Yıl Ücretsiz Kontrol & Temizlik</span>
                            </li>
                        </ul>
                        <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-xl hover:from-yellow-500 hover:to-yellow-600 transition-all transform hover:scale-105 shadow-xl">
                            HEMEN BAŞLAYIN
                        </button>
                    </div>
                </div>
            </section>

            {/* Alt Bilgi */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-blue-600 p-2 rounded-full">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <span className="text-2xl font-bold">DentalCare Pro</span>
                            </div>
                            <p className="text-gray-400">
                                Türkiye'nin en gelişmiş AI destekli diş analiz merkezi.
                                Teknoloji ve deneyimle sağlıklı gülüşler.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4">İletişim</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    <span>0212 123 45 67</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span>info@dentalcarepro.com</span>
                                </div>

                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4">Hizmetler</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>• AI Diş Analizi</li>
                                <li>• Ücretsiz Konsültasyon</li>
                                <li>• Diş Temizliği</li>
                                <li>• Ortodonti</li>
                                <li>• İmplant</li>
                                <li>• Estetik Diş Hekimliği</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 DentalCare Pro. Tüm hakları saklıdır.</p>
                        <p className="mt-2 text-sm">
                            🔒 Verileriniz SSL ile korunmaktadır |
                            📱 Mobil uyumlu tasarım |
                            🏆 ISO 9001 kalite sertifikası
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DentalClinicApp;