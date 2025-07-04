import React, { useState, useRef } from 'react';
import { Upload, MessageCircle, Phone, Mail, User, Camera, Bot, Sparkles, Shield, Award, Clock, Star, Globe, MapPin, Users, Heart, Stethoscope, CheckCircle, Calendar, CreditCard, Trophy, Microscope, Zap, Target } from 'lucide-react';

const DentalClinicApp = () => {
    const [activeTab, setActiveTab] = useState('anasayfa');
    const [currentLang, setCurrentLang] = useState('tr');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [patientForm, setPatientForm] = useState({
        name: '',
        surname: '',
        phone: '',
        email: ''
    });
    const [chatMessages, setChatMessages] = useState([
        { type: 'bot', message: 'Merhaba! Profesyonel diş sağlığı hizmetlerimiz hakkında size nasıl yardımcı olabilirim? Ücretsiz konsültasyon için randevu alabilirsiniz.' }
    ]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const fileInputRef = useRef(null);

    // Dil çevirisi verileri
    const translations = {
        tr: {
            title: 'DentalCare Pro',
            subtitle: 'Türkiye\'nin En Gelişmiş AI Destekli Diş Sağlığı Merkezi',
            home: 'Ana Sayfa',
            analysis: 'Ücretsiz Analiz',
            aiAssistant: 'AI Danışman',
            about: 'Hakkımızda',
            services: 'Hizmetler',
            contact: 'Randevu Al',
            secureAnalysis: 'Garantili Analiz',
            secureAnalysisDesc: 'FDA onaylı AI teknolojisi ile %99 doğruluk',
            professionalService: 'Uzman Kadro',
            professionalServiceDesc: '15+ yıl deneyimli uzman diş hekimleri',
            fastResult: 'Anında Sonuç',
            fastResultDesc: '30 saniyede profesyonel analiz raporu',
            uploadPhoto: 'Ücretsiz Diş Analizi İçin Fotoğraf Yükleyin',
            patientInfo: 'İletişim Bilgileri',
            name: 'Ad',
            surname: 'Soyad',
            phone: 'Telefon',
            email: 'E-posta',
            saveInfo: 'Ücretsiz Konsültasyon Al',
            analysisResults: 'Analiz Sonuçları',
            tartarLevel: 'Tartar Seviyesi',
            yellowingLevel: 'Sarılık Seviyesi',
            recommendations: 'Uzman Önerileri',
            aiDentalAssistant: 'AI Diş Sağlığı Danışmanı',
            askQuestion: 'Sorularınızı 7/24 AI danışmanımıza sorun',
            send: 'Gönder',
            aboutClinic: 'Türkiye\'nin En Prestijli Diş Kliniği',
            aboutDesc: 'Son teknoloji ekipmanlar ve dünya çapında uzman kadromuzla premium diş sağlığı hizmetleri',
            ourServices: 'Premium Hizmetlerimiz',
            dentalCleaning: 'Profesyonel Temizlik',
            whitening: 'Lazer Beyazlatma',
            implant: 'Premium İmplant',
            orthodontics: 'Invisalign',
            ourTeam: 'Uzman Kadromuz',
            experience: 'Yıl Deneyim',
            patients: 'Mutlu Hasta',
            treatments: 'Başarılı Tedavi',
            freeConsultation: 'Ücretsiz Konsültasyon',
            bookAppointment: 'Hemen Randevu Al',
            callNow: 'Hemen Ara',
            whatsapp: 'WhatsApp',
            guarantee: 'Lifetime Garanti',
            insurance: 'Sigorta Kabul',
            financing: 'Taksit İmkanı'
        },
        en: {
            title: 'DentalCare Pro',
            subtitle: 'Turkey\'s Most Advanced AI-Powered Dental Health Center',
            home: 'Home',
            analysis: 'Free Analysis',
            aiAssistant: 'AI Consultant',
            about: 'About Us',
            services: 'Services',
            contact: 'Book Now',
            secureAnalysis: 'Guaranteed Analysis',
            secureAnalysisDesc: 'FDA approved AI technology with 99% accuracy',
            professionalService: 'Expert Team',
            professionalServiceDesc: '15+ years experienced dental specialists',
            fastResult: 'Instant Results',
            fastResultDesc: 'Professional analysis report in 30 seconds',
            uploadPhoto: 'Upload Photo for Free Dental Analysis',
            patientInfo: 'Contact Information',
            name: 'Name',
            surname: 'Surname',
            phone: 'Phone',
            email: 'Email',
            saveInfo: 'Get Free Consultation',
            analysisResults: 'Analysis Results',
            tartarLevel: 'Tartar Level',
            yellowingLevel: 'Yellowing Level',
            recommendations: 'Expert Recommendations',
            aiDentalAssistant: 'AI Dental Health Consultant',
            askQuestion: 'Ask our 24/7 AI consultant your questions',
            send: 'Send',
            aboutClinic: 'Turkey\'s Most Prestigious Dental Clinic',
            aboutDesc: 'Premium dental health services with cutting-edge equipment and world-class expert team',
            ourServices: 'Premium Services',
            dentalCleaning: 'Professional Cleaning',
            whitening: 'Laser Whitening',
            implant: 'Premium Implant',
            orthodontics: 'Invisalign',
            ourTeam: 'Expert Team',
            experience: 'Years Experience',
            patients: 'Happy Patients',
            treatments: 'Successful Treatments',
            freeConsultation: 'Free Consultation',
            bookAppointment: 'Book Appointment Now',
            callNow: 'Call Now',
            whatsapp: 'WhatsApp',
            guarantee: 'Lifetime Guarantee',
            insurance: 'Insurance Accepted',
            financing: 'Financing Available'
        }
    };

    const t = translations[currentLang];

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

            setAnalysisResult({
                tartarLevel: randomTartar,
                yellowingLevel: randomYellowing,
                recommendation: randomTartar > 50 ? 'Yüksek tartar seviyesi tespit edildi. Acil profesyonel diş temizliği önerilir. Ücretsiz konsültasyon için hemen randevu alın.' : 'Tartar seviyesi normal aralıkta. Koruyucu bakım için 6 ayda bir kontrol önerilir.'
            });
            setIsAnalyzing(false);
        }, 3000);
    };

    const handleFormSubmit = () => {
        if (patientForm.name && patientForm.surname && patientForm.phone && patientForm.email) {
            alert('Tebrikler! Ücretsiz konsültasyon talebiniz alındı. 24 saat içinde uzmanlarımız sizi arayacak.');
            setPatientForm({ name: '', surname: '', phone: '', email: '' });
        } else {
            alert('Ücretsiz konsültasyon için lütfen tüm alanları doldurunuz.');
        }
    };

    const handleSendMessage = () => {
        if (currentMessage.trim()) {
            setChatMessages([...chatMessages, { type: 'user', message: currentMessage }]);

            setTimeout(() => {
                const responses = [
                    'Diş ağrısı acil müdahale gerektirir. Hemen randevu alın, ilk muayene ücretsiz! 📞 0212 123 45 67',
                    'Profesyonel diş temizliği sadece 299₺! Tartar temizliği + parlatma + fluorlu koruma dahil.',
                    'Lazer beyazlatma özel fırsatı: 8 tona kadar beyazlatma garantili! İlk konsültasyon ücretsiz.',
                    'Premium implant tedavisi: Lifetime garanti + 12 ay taksit imkanı. Ücretsiz 3D analiz!',
                    'Invisalign şeffaf plaklarla gülümsemenizi yenileyin. %50 indirim fırsatı sınırlı süre!'
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                setChatMessages(prev => [...prev, { type: 'bot', message: randomResponse }]);
            }, 1000);

            setCurrentMessage('');
        }
    };

    const TabButton = ({ id, icon: Icon, label, active, onClick }) => (
        <button
            onClick={() => onClick(id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${active
                ? 'bg-white text-blue-600 shadow-lg scale-105 font-bold'
                : 'bg-white/20 text-white hover:bg-white/30'
                }`}
        >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 py-2 relative z-10">
                    {/* Top Bar */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                <span className="hidden sm:inline">0212 123 45 67</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                <span className="hidden sm:inline">info@dentalcarepro.com</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                            <Globe className="w-4 h-4" />
                            <select
                                value={currentLang}
                                onChange={(e) => setCurrentLang(e.target.value)}
                                className="bg-transparent border-none text-white text-sm focus:outline-none"
                            >
                                <option value="tr" className="text-black">Türkçe</option>
                                <option value="en" className="text-black">English</option>
                            </select>
                        </div>
                    </div>

                    <div className="text-center py-6">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="p-3 bg-white/20 rounded-full">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold">{t.title}</h1>
                                <div className="flex items-center justify-center gap-2 mt-1">
                                    <Star className="w-5 h-5 text-yellow-400" />
                                    <span className="text-sm">★★★★★ 4.9/5 (2.847 değerlendirme)</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-4">
                            {t.subtitle}
                        </p>
                        <div className="flex justify-center gap-4 text-sm">
                            <span className="bg-green-500 px-3 py-1 rounded-full">✓ FDA Onaylı</span>
                            <span className="bg-blue-500 px-3 py-1 rounded-full">✓ Lifetime Garanti</span>
                            <span className="bg-purple-500 px-3 py-1 rounded-full">✓ 0% Faiz</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex justify-center gap-4 pb-4">
                        <TabButton
                            id="anasayfa"
                            icon={Sparkles}
                            label={t.home}
                            active={activeTab === 'anasayfa'}
                            onClick={setActiveTab}
                        />
                        <TabButton
                            id="hakkimizda"
                            icon={Users}
                            label={t.about}
                            active={activeTab === 'hakkimizda'}
                            onClick={setActiveTab}
                        />
                        <TabButton
                            id="sarılık"
                            icon={Camera}
                            label={t.analysis}
                            active={activeTab === 'sarılık'}
                            onClick={setActiveTab}
                        />
                        <TabButton
                            id="chatbot"
                            icon={MessageCircle}
                            label={t.aiAssistant}
                            active={activeTab === 'chatbot'}
                            onClick={setActiveTab}
                        />
                    </nav>
                </div>
            </header>

            {/* CTA Banner */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 py-3">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-white font-semibold">
                        🎉 ÖZEL KAMPANYA: Bu ay içinde randevu alanlara %50 indirim!
                        <span className="ml-2 bg-white text-green-600 px-3 py-1 rounded-full text-sm font-bold">
                            Sadece 48 saat kaldı!
                        </span>
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                {/* Ana Sayfa */}
                {activeTab === 'anasayfa' && (
                    <div className="space-y-16">
                        {/* Hero Section */}
                        <div className="text-center">
                            <h2 className="text-5xl font-bold text-gray-900 mb-6">
                                Türkiye'nin En Prestijli <span className="text-blue-600">Diş Kliniği</span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                                Hollywood gülümsemesi için son teknoloji ekipmanlar, dünya çapında uzman kadro ve lifetime garanti ile hizmetinizdeyiz.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex justify-center gap-4 mb-12">
                                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all">
                                    🎯 Ücretsiz Konsültasyon Al
                                </button>
                                <button className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all">
                                    📞 Hemen Ara: 0212 123 45 67
                                </button>
                            </div>

                            {/* Trust Indicators */}
                            <div className="grid md:grid-cols-4 gap-6 mb-16">
                                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                                    <p className="text-gray-600 font-semibold">{t.experience}</p>
                                    <p className="text-sm text-gray-500">Uluslararası Sertifikalı</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
                                    <div className="text-3xl font-bold text-green-600 mb-2">25K+</div>
                                    <p className="text-gray-600 font-semibold">{t.patients}</p>
                                    <p className="text-sm text-gray-500">★★★★★ Memnuniyet</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
                                    <p className="text-gray-600 font-semibold">{t.treatments}</p>
                                    <p className="text-sm text-gray-500">%100 Garanti</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100">
                                    <div className="text-3xl font-bold text-orange-600 mb-2">99%</div>
                                    <p className="text-gray-600 font-semibold">Doğruluk Oranı</p>
                                    <p className="text-sm text-gray-500">AI Analiz Sistemi</p>
                                </div>
                            </div>
                        </div>

                        {/* Premium Services */}
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12">
                            <h3 className="text-4xl font-bold text-center mb-4 text-gray-900">
                                Premium Diş Sağlığı Hizmetleri
                            </h3>
                            <p className="text-center text-gray-600 mb-12 text-lg">
                                Dünya standartlarında ekipman ve uzman kadro ile Hollywood gülümsemesi
                            </p>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                                    <div className="bg-blue-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                        <Sparkles className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2 text-center">Lazer Temizlik</h4>
                                    <p className="text-gray-600 text-center mb-4">Ağrısız, hızlı ve etkili</p>
                                    <div className="text-center">
                                        <span className="text-2xl font-bold text-blue-600">299₺</span>
                                        <span className="text-sm text-gray-500 line-through ml-2">599₺</span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                                    <div className="bg-yellow-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                        <Zap className="w-8 h-8 text-yellow-600" />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2 text-center">Lazer Beyazlatma</h4>
                                    <p className="text-gray-600 text-center mb-4">8 tona kadar beyazlatma</p>
                                    <div className="text-center">
                                        <span className="text-2xl font-bold text-yellow-600">1.999₺</span>
                                        <span className="text-sm text-gray-500 line-through ml-2">3.999₺</span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                                    <div className="bg-green-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                        <Trophy className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2 text-center">Premium İmplant</h4>
                                    <p className="text-gray-600 text-center mb-4">Lifetime garantili</p>
                                    <div className="text-center">
                                        <span className="text-2xl font-bold text-green-600">3.999₺</span>
                                        <span className="text-sm text-gray-500 line-through ml-2">7.999₺</span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                                    <div className="bg-purple-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                        <Target className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2 text-center">Invisalign</h4>
                                    <p className="text-gray-600 text-center mb-4">Şeffaf plak tedavi</p>
                                    <div className="text-center">
                                        <span className="text-2xl font-bold text-purple-600">4.999₺</span>
                                        <span className="text-sm text-gray-500 line-through ml-2">9.999₺</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-8">
                                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all">
                                    🎯 Tüm Fiyatları Görüntüle
                                </button>
                            </div>
                        </div>

                        {/* Testimonials */}
                        <div className="bg-white rounded-3xl p-12 shadow-lg">
                            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
                                Hastalarımızın Yorumları
                            </h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="text-center p-6">
                                    <div className="flex justify-center mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mb-4 italic">
                                        "Hayatımda gördüğüm en profesyonel diş kliniği. AI analiz sistemi harika, sonuçlar çok doğru çıktı!"
                                    </p>
                                    <div className="font-semibold text-gray-900">Ayşe K.</div>
                                    <div className="text-sm text-gray-500">Lazer Beyazlatma</div>
                                </div>

                                <div className="text-center p-6">
                                    <div className="flex justify-center mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mb-4 italic">
                                        "İmplant tedavim mükemmel oldu. Ağrısız, hızlı ve lifetime garanti. Kesinlikle tavsiye ederim!"
                                    </p>
                                    <div className="font-semibold text-gray-900">Mehmet B.</div>
                                    <div className="text-sm text-gray-500">Premium İmplant</div>
                                </div>

                                <div className="text-center p-6">
                                    <div className="flex justify-center mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mb-4 italic">
                                        "Invisalign tedavisini burada yaptırdım. Şeffaf plaklar çok rahattı, sonuç harika oldu!"
                                    </p>
                                    <div className="font-semibold text-gray-900">Zeynep T.</div>
                                    <div className="text-sm text-gray-500">Invisalign</div>
                                </div>
                            </div>
                        </div>

                        {/* Expert Team */}
                        <div className="text-center">
                            <h3 className="text-3xl font-bold mb-4 text-gray-900">Dünya Çapında Uzman Kadromuz</h3>
                            <p className="text-gray-600 mb-12 text-lg">Uluslararası sertifikalı, 15+ yıl deneyimli uzman diş hekimleri</p>

                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                                        <User className="w-12 h-12 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">Prof. Dr. Ahmet Yılmaz</h4>
                                    <p className="text-blue-600 font-semibold mb-2">Başhekim - Oral & Maxillofacial</p>
                                    <p className="text-sm text-gray-600 mb-4">
                                        • Harvard Üniversitesi Mezunu<br />
                                        • 15 yıl deneyim, 5000+ implant<br />
                                        • Uluslararası sertifikalı
                                    </p>
                                    <div className="flex justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                                        <User className="w-12 h-12 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">Dr. Elif Kaya</h4>
                                    <p className="text-green-600 font-semibold mb-2">Ortodonti Uzmanı</p>
                                    <p className="text-sm text-gray-600 mb-4">
                                        • Invisalign Certified Provider<br />
                                        • 10 yıl deneyim, 2000+ hasta<br />
                                        • Avrupa sertifikalı
                                    </p>
                                    <div className="flex justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                                    <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                                        <User className="w-12 h-12 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">Dr. Mehmet Demir</h4>
                                    <p className="text-purple-600 font-semibold mb-2">Estetik Diş Hekimi</p>
                                    <p className="text-sm text-gray-600 mb-4">
                                        • Beverly Hills Sertifikalı<br />
                                        • 12 yıl deneyim, 3000+ veneer<br />
                                        • Hollywood gülümsemesi uzmanı
                                    </p>
                                    <div className="flex justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Final CTA */}
                        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-12 text-center text-white">
                            <h3 className="text-4xl font-bold mb-4">
                                Hayalinizdeki Gülümsemeye Kavuşun!
                            </h3>
                            <p className="text-xl mb-8 text-blue-100">
                                Ücretsiz konsültasyon ve %50 indirim fırsatını kaçırmayın
                            </p>
                            <div className="flex justify-center gap-4">
                                <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all">
                                    📞 Hemen Ara: 0212 123 45 67
                                </button>
                                <button className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all">
                                    💬 WhatsApp: 0532 123 45 67
                                </button>
                            </div>
                            <p className="text-sm mt-4 text-blue-200">
                                ⏰ Kampanya 48 saat içinde sona eriyor!
                            </p>
                        </div>
                    </div>
                )}

                {/* Hakkımızda */}
                {activeTab === 'hakkimizda' && (
                    <div className="space-y-16">
                        <div className="text-center">
                            <h2 className="text-5xl font-bold text-gray-900 mb-6">
                                {t.aboutClinic}
                            </h2>
                            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
                                {t.aboutDesc}
                            </p>
                        </div>

                        {/* Öne Çıkan Özellikler */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-100">
                                <div className="bg-blue-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                                    <Shield className="w-8 h-8 text-blue-600" />
                                </div>
                                <h4 className="text-xl font-bold mb-4 text-center">{t.secureAnalysis}</h4>
                                <p className="text-gray-600 text-center">{t.secureAnalysisDesc}</p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-100">
                                <div className="bg-green-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                                    <Award className="w-8 h-8 text-green-600" />
                                </div>
                                <h4 className="text-xl font-bold mb-4 text-center">{t.professionalService}</h4>
                                <p className="text-gray-600 text-center">{t.professionalServiceDesc}</p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-100">
                                <div className="bg-purple-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                                    <Clock className="w-8 h-8 text-purple-600" />
                                </div>
                                <h4 className="text-xl font-bold mb-4 text-center">{t.fastResult}</h4>
                                <p className="text-gray-600 text-center">{t.fastResultDesc}</p>
                            </div>
                        </div>

                        {/* Klinik Bilgileri */}
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h3 className="text-3xl font-bold mb-6 text-gray-900">
                                        Neden DentalCare Pro?
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-green-500 rounded-full p-2">
                                                <CheckCircle className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Son Teknoloji Ekipmanlar</h4>
                                                <p className="text-gray-600">3D dijital görüntüleme, lazer tedavi sistemleri</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="bg-green-500 rounded-full p-2">
                                                <CheckCircle className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Uluslararası Standartlar</h4>
                                                <p className="text-gray-600">FDA onaylı malzemeler, sterilizasyon protokolleri</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="bg-green-500 rounded-full p-2">
                                                <CheckCircle className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Lifetime Garanti</h4>
                                                <p className="text-gray-600">Tüm tedavilerde yaşam boyu garanti</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="bg-green-500 rounded-full p-2">
                                                <CheckCircle className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Esnek Ödeme</h4>
                                                <p className="text-gray-600">12 aya kadar 0% faizli taksit imkanı</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-2xl p-8 shadow-lg">
                                    <h4 className="text-2xl font-bold mb-6 text-center text-gray-900">
                                        Klinik İstatistikleri
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4">
                                            <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                                            <p className="text-sm text-gray-600">Yıl Deneyim</p>
                                        </div>
                                        <div className="text-center p-4">
                                            <div className="text-3xl font-bold text-green-600 mb-2">25K+</div>
                                            <p className="text-sm text-gray-600">Mutlu Hasta</p>
                                        </div>
                                        <div className="text-center p-4">
                                            <div className="text-3xl font-bold text-purple-600 mb-2">99%</div>
                                            <p className="text-sm text-gray-600">Memnuniyet</p>
                                        </div>
                                        <div className="text-center p-4">
                                            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                                            <p className="text-sm text-gray-600">Acil Hizmet</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sarılık Analizi */}
                {activeTab === 'sarılık' && (
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                🦷 Ücretsiz AI Diş Analizi
                            </h2>
                            <p className="text-xl text-gray-600">
                                FDA onaylı AI teknolojisi ile 30 saniyede profesyonel analiz
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Fotoğraf Yükleme */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                                    {t.uploadPhoto}
                                </h3>

                                <div
                                    className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-all"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {uploadedImage ? (
                                        <div className="space-y-4">
                                            <img
                                                src={uploadedImage}
                                                alt="Uploaded"
                                                className="max-w-full h-48 object-cover rounded-lg mx-auto"
                                            />
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                                            >
                                                <Camera className="w-5 h-5 inline mr-2" />
                                                Yeni Fotoğraf Yükle
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="bg-blue-100 rounded-full p-8 w-24 h-24 flex items-center justify-center mx-auto">
                                                <Upload className="w-8 h-8 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-gray-900 mb-2">
                                                    Diş fotoğrafınızı yükleyin
                                                </p>
                                                <p className="text-gray-600 text-sm">
                                                    JPG, PNG formatında maksimum 5MB
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />

                                {/* Analiz Sonuçları */}
                                {isAnalyzing && (
                                    <div className="mt-8 text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                        <p className="text-lg font-semibold text-blue-600">
                                            AI analiz gerçekleştiriliyor...
                                        </p>
                                    </div>
                                )}

                                {analysisResult && !isAnalyzing && (
                                    <div className="mt-8 space-y-6">
                                        <h4 className="text-xl font-bold text-gray-900">{t.analysisResults}</h4>

                                        <div className="space-y-4">
                                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-semibold text-gray-900">{t.tartarLevel}</span>
                                                    <span className="text-2xl font-bold text-orange-600">
                                                        {analysisResult.tartarLevel}%
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-3">
                                                    <div
                                                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-1000"
                                                        style={{ width: `${analysisResult.tartarLevel}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-semibold text-gray-900">{t.yellowingLevel}</span>
                                                    <span className="text-2xl font-bold text-yellow-600">
                                                        {analysisResult.yellowingLevel}%
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-3">
                                                    <div
                                                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-1000"
                                                        style={{ width: `${analysisResult.yellowingLevel}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 rounded-xl p-6">
                                            <h5 className="font-bold text-gray-900 mb-3 flex items-center">
                                                <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
                                                {t.recommendations}
                                            </h5>
                                            <p className="text-gray-700 leading-relaxed">
                                                {analysisResult.recommendation}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Hasta Bilgileri */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                                    {t.patientInfo}
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            {t.name} *
                                        </label>
                                        <input
                                            type="text"
                                            value={patientForm.name}
                                            onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Adınızı giriniz"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            {t.surname} *
                                        </label>
                                        <input
                                            type="text"
                                            value={patientForm.surname}
                                            onChange={(e) => setPatientForm({ ...patientForm, surname: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Soyadınızı giriniz"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            {t.phone} *
                                        </label>
                                        <input
                                            type="tel"
                                            value={patientForm.phone}
                                            onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="0532 123 45 67"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            {t.email} *
                                        </label>
                                        <input
                                            type="email"
                                            value={patientForm.email}
                                            onChange={(e) => setPatientForm({ ...patientForm, email: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="ornek@email.com"
                                        />
                                    </div>

                                    <button
                                        onClick={handleFormSubmit}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
                                    >
                                        <Calendar className="w-5 h-5 inline mr-2" />
                                        {t.saveInfo}
                                    </button>

                                    <div className="text-center pt-4">
                                        <div className="flex justify-center gap-4 mb-4">
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                                ✓ Ücretsiz Konsültasyon
                                            </span>
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                                                ✓ %50 İndirim
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            📞 Uzmanlarımız 24 saat içinde sizi arayacak
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Chatbot */}
                {activeTab === 'chatbot' && (
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                🤖 {t.aiDentalAssistant}
                            </h2>
                            <p className="text-xl text-gray-600">
                                {t.askQuestion}
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Chat Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 rounded-full p-3">
                                        <Bot className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">AI Diş Sağlığı Danışmanı</h3>
                                        <p className="text-blue-100 text-sm">🟢 Çevrimiçi - Anında yanıtlar</p>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="h-96 overflow-y-auto p-6 space-y-4">
                                {chatMessages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${msg.type === 'user'
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-gray-100 text-gray-900 rounded-bl-none'
                                            }`}>
                                            {msg.type === 'bot' && (
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Bot className="w-4 h-4 text-blue-600" />
                                                    <span className="text-xs font-semibold text-blue-600">AI Danışman</span>
                                                </div>
                                            )}
                                            <p className="text-sm leading-relaxed">{msg.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Chat Input */}
                            <div className="border-t border-gray-200 p-4">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={currentMessage}
                                        onChange={(e) => setCurrentMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Diş sağlığınız hakkında sorun..."
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex justify-center gap-2 mt-3">
                                    <button
                                        onClick={() => setCurrentMessage('Diş ağrım var, ne yapmalıyım?')}
                                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
                                    >
                                        Diş ağrısı
                                    </button>
                                    <button
                                        onClick={() => setCurrentMessage('Diş beyazlatma fiyatları nedir?')}
                                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
                                    >
                                        Beyazlatma
                                    </button>
                                    <button
                                        onClick={() => setCurrentMessage('İmplant tedavisi hakkında bilgi')}
                                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
                                    >
                                        İmplant
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Sparkles className="w-6 h-6" />
                                DentalCare Pro
                            </h4>
                            <p className="text-gray-400 mb-4">
                                Türkiye'nin en prestijli AI destekli diş sağlığı merkezi
                            </p>
                            <div className="flex gap-4">
                                <div className="bg-blue-600 p-2 rounded-full">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div className="bg-green-600 p-2 rounded-full">
                                    <MessageCircle className="w-4 h-4" />
                                </div>
                                <div className="bg-purple-600 p-2 rounded-full">
                                    <Mail className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h5 className="font-bold mb-4">Hızlı Menü</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Ana Sayfa</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Hizmetler</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Fiyatlar</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-bold mb-4">Hizmetler</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Diş Temizliği</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Lazer Beyazlatma</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">İmplant Tedavisi</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Ortodonti</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Estetik Diş Hekimliği</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-bold mb-4">İletişim</h5>
                            <div className="space-y-3 text-gray-400">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>Nişantaşı, İstanbul</span>
                                </div>
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
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 DentalCare Pro. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DentalClinicApp;