import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const MAP_MARKERS = [{"lat":37.40136,"lng":140.352005,"name":"有限会社 会津建設","address":"福島県郡山市桑野2-39-4","color":"#ff5a1f"},{"lat":39.711102,"lng":140.092651,"name":"有限会社 アイエスビー","address":"秋田県秋田市川尻大川町3-7","color":"#e3a008"},{"lat":40.21526,"lng":140.368973,"name":"朝日建設 株式会社","address":"秋田県北秋田市脇神字平崎川戸沼１２ー７","color":"#e3a008"},{"lat":43.025867,"lng":141.45549,"name":"イエローウィング協同組合","address":"北海道札幌市厚別区大谷地東5丁目3番30号","color":"#06b6d4"},{"lat":39.675987,"lng":141.131668,"name":"株式会社 岩手マイタック","address":"岩手県盛岡市北飯岡2-4-1","color":"#1a56db"},{"lat":39.179012,"lng":140.431061,"name":"有限会社 五十嵐運輸","address":"秋田県雄勝郡羽後町野中字野中78","color":"#e3a008"},{"lat":35.383583,"lng":132.733414,"name":"株式会社 板倉重機","address":"島根県出雲市江田町268-2","color":"#84cc16"},{"lat":38.841148,"lng":139.902679,"name":"板垣建設管工 株式会社","address":"山形県東田川郡庄内町余目字下梵天塚42-8","color":"#d61f69"},{"lat":37.455204,"lng":140.676025,"name":"有限会社 石井建設工業","address":"福島県田村市常葉町山根字富岡68-2","color":"#ff5a1f"},{"lat":39.914268,"lng":141.201996,"name":"有限会社 岩崎建設","address":"岩手県岩手郡岩手町大字川口第12地割3-1","color":"#1a56db"},{"lat":39.707798,"lng":141.092957,"name":"株式会社 内澤建設","address":"岩手県盛岡市上厨川野子146-1","color":"#1a56db"},{"lat":40.649483,"lng":141.333298,"name":"株式会社 漆舘組","address":"青森県上北郡六戸町大字犬落瀬字柳沢91-2","color":"#7e3af2"},{"lat":38.211742,"lng":140.859161,"name":"株式会社 エルニード東北","address":"宮城県仙台市太白区富沢西4-1-10","color":"#0e9f6e"},{"lat":38.595211,"lng":141.024261,"name":"株式会社 江村工務店","address":"宮城県大崎市田尻字町184-4","color":"#0e9f6e"},{"lat":39.695858,"lng":140.104462,"name":"M・Tコンサルティング 株式会社","address":"秋田県秋田市茨島4-6-46","color":"#e3a008"},{"lat":38.779781,"lng":140.522079,"name":"株式会社 MGM","address":"山形県最上郡最上町大字向町67-3","color":"#d61f69"},{"lat":40.627232,"lng":141.238052,"name":"株式会社 FLK","address":"青森県十和田市東二十一番町36番45号","color":"#7e3af2"},{"lat":37.388351,"lng":140.452194,"name":"株式会社 エンジン","address":"福島県田村郡三春町大字斎藤字仁井道348-5","color":"#ff5a1f"},{"lat":39.382423,"lng":141.236023,"name":"有限会社 小原組","address":"岩手県花巻市東和町土沢９区２１９","color":"#1a56db"},{"lat":38.779781,"lng":140.522079,"name":"株式会社 小川建設","address":"山形県最上郡最上町大字向町67-3","color":"#d61f69"},{"lat":39.247192,"lng":140.37706,"name":"株式会社 小野建設","address":"秋田県雄勝郡羽後町新町最上山7-1","color":"#e3a008"},{"lat":39.385303,"lng":141.209091,"name":"株式会社 大久保建設","address":"岩手県花巻市東和町安俵２区１１番地","color":"#1a56db"},{"lat":39.500217,"lng":141.149384,"name":"有限会社 神山工業","address":"岩手県花巻市石鳥谷町好地第９地割８４-１","color":"#1a56db"},{"lat":35.6991,"lng":139.74527,"name":"関東テック協同組合","address":"東京都千代田区富士見二丁目2番5号","color":"#6b7280"},{"lat":38.792797,"lng":140.310654,"name":"株式会社 葛麓","address":"山形県新庄市十日町1570-２","color":"#d61f69"},{"lat":38.448013,"lng":141.050064,"name":"有限会社 金成組","address":"宮城県大崎市鹿島台大迫字上志田204番地","color":"#0e9f6e"},{"lat":39.404003,"lng":141.135452,"name":"株式会社 共和緑化","address":"岩手県花巻市下似内第5地割105番地2","color":"#1a56db"},{"lat":38.209827,"lng":140.926865,"name":"有限会社 共和興業","address":"宮城県仙台市若林区今泉2-18-52","color":"#0e9f6e"},{"lat":42.64983,"lng":141.634125,"name":"有限会社 共辰土木工業","address":"北海道苫小牧市一本松町14番地4","color":"#06b6d4"},{"lat":39.330524,"lng":141.080002,"name":"有限会社 菊池工業","address":"岩手県北上市藤沢6-33-8","color":"#1a56db"},{"lat":39.737785,"lng":141.105377,"name":"協積産業 株式会社","address":"岩手県盛岡市月が丘3-46-32","color":"#1a56db"},{"lat":39.862919,"lng":140.007599,"name":"有限会社 共友建設","address":"秋田県潟上市天王字天塩1016-3","color":"#e3a008"},{"lat":40.300629,"lng":140.760422,"name":"株式会社 現代","address":"秋田県鹿角郡小坂町荒谷字手紙沢54-63","color":"#e3a008"},{"lat":40.17617,"lng":141.109436,"name":"有限会社 小船建設","address":"岩手県二戸市浄法寺町新山48","color":"#1a56db"},{"lat":37.285439,"lng":140.631912,"name":"株式会社 近野左官工業","address":"福島県田村郡小野町大字小野新町字前久保41-2","color":"#ff5a1f"},{"lat":39.401493,"lng":141.039886,"name":"株式会社 佐々木工務店","address":"岩手県花巻市湯口字山根80","color":"#1a56db"},{"lat":39.558224,"lng":141.172806,"name":"佐々木建設 株式会社","address":"岩手県紫波郡紫波町日詰字石田56","color":"#1a56db"},{"lat":39.457981,"lng":141.12619,"name":"株式会社 佐賀建設","address":"岩手県花巻市石鳥谷町南寺林第5地割297","color":"#1a56db"},{"lat":39.891441,"lng":139.855316,"name":"株式会社 沢木組","address":"秋田県男鹿市船川港船川字海岸通り2-6-2","color":"#e3a008"},{"lat":39.285847,"lng":139.970688,"name":"三共 株式会社","address":"秋田県にかほ市平沢字出ヶ沢1-1","color":"#e3a008"},{"lat":39.763046,"lng":141.167923,"name":"サンワ","address":"岩手県盛岡市北松園3-12-17","color":"#1a56db"},{"lat":35.784889,"lng":139.878494,"name":"株式会社 サンエイ企画","address":"埼玉県三郷市高州2丁目162-1","color":"#9ca3af"},{"lat":35.490952,"lng":134.209061,"name":"株式会社 サンクリエイト","address":"鳥取県鳥取市古海260番地26","color":"#84cc16"},{"lat":39.723961,"lng":140.161484,"name":"株式会社 常総興業","address":"秋田県秋田市下北手松崎字走り崎48-1","color":"#e3a008"},{"lat":40.300629,"lng":140.760422,"name":"シー・アンド・シー 株式会社","address":"秋田県鹿角郡小坂町荒谷字手紙沢54番地5","color":"#e3a008"},{"lat":37.976349,"lng":140.868164,"name":"有限会社 渋谷組","address":"宮城県亘理郡山元町鷲足字南中江28番地","color":"#0e9f6e"},{"lat":38.73867,"lng":141.08165,"name":"株式会社 白神土木総建","address":"宮城県栗原市若柳上畑岡大森82-4","color":"#0e9f6e"},{"lat":39.39183,"lng":141.228027,"name":"菅原建設 株式会社","address":"岩手県花巻市東和町土沢2区36番地","color":"#1a56db"},{"lat":39.974396,"lng":139.87291,"name":"株式会社 杉本組","address":"秋田県男鹿市五里合箱井字町屋田221番地","color":"#e3a008"},{"lat":38.782871,"lng":140.329376,"name":"有限会社 誠信興業","address":"山形県新庄市五日町2929-8","color":"#d61f69"},{"lat":35.723671,"lng":139.562683,"name":"株式会社 ソリド・ワン","address":"東京都西東京市東伏見3丁目8番13号","color":"#6b7280"},{"lat":38.130177,"lng":140.881668,"name":"株式会社 平良","address":"宮城県名取市本郷字矢口９","color":"#0e9f6e"},{"lat":39.659897,"lng":141.139389,"name":"大伸工業 株式会社","address":"岩手県盛岡市永井14地割5","color":"#1a56db"},{"lat":38.824203,"lng":141.070068,"name":"株式会社 髙橋技建","address":"宮城県栗原市金成三沢２２９－８","color":"#0e9f6e"},{"lat":40.17617,"lng":141.109436,"name":"有限会社 高峰重機","address":"岩手県二戸市浄法寺町安戸103-4","color":"#1a56db"},{"lat":35.681892,"lng":139.379227,"name":"株式会社 瀧澤建設","address":"東京都日野市新町四丁目26番地の11","color":"#6b7280"},{"lat":39.390896,"lng":141.157715,"name":"株式会社 多田工務店","address":"岩手県花巻市高松第3地割128","color":"#1a56db"},{"lat":40.270031,"lng":141.718811,"name":"筑波重工 株式会社","address":"岩手県九戸郡洋野町阿子木18-35-29","color":"#1a56db"},{"lat":40.232098,"lng":140.356445,"name":"株式会社 津谷組","address":"秋田県北秋田市坊沢字胡桃館15番地の1","color":"#e3a008"},{"lat":42.681538,"lng":141.68985,"name":"株式会社 TK・ワークス","address":"北海道苫小牧市ウトナイ北4丁目6番5号","color":"#06b6d4"},{"lat":39.697765,"lng":141.122833,"name":"樋下建設 株式会社","address":"岩手県盛岡市下太田下川原１００番１号","color":"#1a56db"},{"lat":39.812336,"lng":140.061966,"name":"株式会社 東北架設工業","address":"秋田県秋田市下新城長岡字耳取68-16","color":"#e3a008"},{"lat":39.268669,"lng":141.110748,"name":"塗装の佐藤","address":"岩手県北上市鬼柳町川原小屋23-3","color":"#1a56db"},{"lat":40.89146,"lng":141.288712,"name":"株式会社 鳥山土木工業","address":"青森県上北郡六ヶ所村大字倉内字笹崎232-14","color":"#7e3af2"},{"lat":39.649773,"lng":140.174561,"name":"有限会社 東北特殊工事","address":"秋田県秋田市河辺豊成字祖神台103-1","color":"#e3a008"},{"lat":39.640358,"lng":140.195618,"name":"有限会社 東北特殊工事","address":"秋田県秋田市河辺戸島字上高屋67番地1","color":"#e3a008"},{"lat":41.134251,"lng":141.300552,"name":"株式会社 東星建設","address":"青森県上北郡横浜町苗代川目42-12","color":"#7e3af2"},{"lat":42.62883,"lng":141.543777,"name":"株式会社 中島土建","address":"北海道苫小牧市日新町1-10-1","color":"#06b6d4"},{"lat":38.182831,"lng":140.883987,"name":"有限会社 原建","address":"宮城県名取市上余田字市坪416-1","color":"#0e9f6e"},{"lat":40.226696,"lng":140.373993,"name":"株式会社 芳賀工務店","address":"秋田県北秋田市旭町9番3号","color":"#e3a008"},{"lat":35.56958,"lng":139.640152,"name":"株式会社 八工業","address":"神奈川県川崎市中原区下小田中6-31-18","color":"#9ca3af"},{"lat":39.707363,"lng":141.16658,"name":"東野建設工業 株式会社","address":"岩手県盛岡市加賀野2-8-15","color":"#1a56db"},{"lat":38.825897,"lng":140.355713,"name":"株式会社 ピーシーカトー","address":"山形県新庄市大字萩野753番地の1","color":"#d61f69"},{"lat":38.127365,"lng":140.922379,"name":"株式会社 ほくとう 宮城支店","address":"宮城県岩沼市空港南5-1-1","color":"#0e9f6e"},{"lat":39.629501,"lng":141.110535,"name":"株式会社 ほくとう 岩手支店","address":"岩手県紫波郡矢巾町広宮沢10地割505-1","color":"#1a56db"},{"lat":40.550838,"lng":141.426849,"name":"株式会社 ほくとう本社","address":"青森県八戸市北インター工業団地三丁目2番80号","color":"#7e3af2"},{"lat":40.232651,"lng":140.362457,"name":"有限会社 ほくしんリース","address":"秋田県北秋田市綴子字田中下モ23番地","color":"#e3a008"},{"lat":39.693493,"lng":140.149323,"name":"マスターピースクラフト 株式会社","address":"秋田県秋田市山手台1丁目１－１","color":"#e3a008"},{"lat":35.702534,"lng":139.785446,"name":"株式会社 マイタック","address":"東京都台東区鳥越2-10-5","color":"#6b7280"},{"lat":37.446705,"lng":140.389145,"name":"有限会社 真壁工務店","address":"福島県郡山市日和田町字背戸37-2","color":"#ff5a1f"},{"lat":39.130093,"lng":141.111267,"name":"有限会社 丸高工務店","address":"岩手県奥州市胆沢南都田字濁川29番地","color":"#1a56db"},{"lat":35.352673,"lng":132.744034,"name":"ミシマ産業 株式会社","address":"島根県出雲市天神町869","color":"#84cc16"},{"lat":38.412018,"lng":140.200104,"name":"ミヤウチ建設株式会社","address":"山形県寒河江市大字白岩821番地の1","color":"#d61f69"},{"lat":39.708511,"lng":141.116379,"name":"盛圧工業 株式会社","address":"岩手県盛岡市中屋敷町8番40号","color":"#1a56db"},{"lat":35.688866,"lng":139.782333,"name":"山﨑建設 株式会社","address":"東京都中央区日本橋富沢町8-6","color":"#6b7280"},{"lat":39.151772,"lng":141.512894,"name":"有限会社 山崎工業","address":"岩手県気仙郡住田町世田米字川向95-9","color":"#1a56db"},{"lat":40.167004,"lng":141.505463,"name":"有限会社 谷地林業","address":"岩手県久慈市山形町荷軽部3-18","color":"#1a56db"},{"lat":38.309578,"lng":140.373947,"name":"株式会社 ヤマコン","address":"山形県山形市十文字天神東770","color":"#d61f69"},{"lat":35.798389,"lng":139.794601,"name":"協同組合ユウアンドアイ","address":"東京都足立区竹ノ塚7-8-4","color":"#6b7280"},{"lat":35.620068,"lng":139.561096,"name":"株式会社 吉孝土建","address":"神奈川県川崎市多摩区登戸1768番地","color":"#9ca3af"},{"lat":39.191345,"lng":140.445114,"name":"合同会社 米山工業","address":"秋田県雄勝郡羽後町貝沢字拾三本塚143-5","color":"#e3a008"},{"lat":39.250515,"lng":141.43959,"name":"株式会社 竜徳工業","address":"岩手県遠野市小友町３２地割９１","color":"#1a56db"},{"lat":39.373833,"lng":141.118729,"name":"有限会社 緑進工業","address":"岩手県花巻市桜町4-256-5","color":"#1a56db"}];

function CietMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const initMap = () => {
      if (!mapRef.current || mapInstanceRef.current) return;
      const L = (window as any).L;
      const map = L.map(mapRef.current, {
        center: [39.5, 141.0],
        zoom: 7,
        scrollWheelZoom: false,
      });
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);
      MAP_MARKERS.forEach(m => {
        L.circleMarker([m.lat, m.lng], {
          radius: 8,
          color: 'white',
          weight: 2,
          fillColor: m.color,
          fillOpacity: 0.9,
        }).bindTooltip(`<b>${m.name}</b><br><span style="color:#666">${m.address}</span>`, { direction: 'top', sticky: false }).addTo(map);
      });
      mapInstanceRef.current = map;
    };

    if ((window as any).L) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} style={{ height: '520px', width: '100%' }} />;
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // スクロール監視
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ナビゲーション */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#service" className={`text-sm font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-[#ff6b35]' : 'text-white hover:text-[#ff6b35]'}`}>サービス</a>
            <a href="#program" className={`text-sm font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-[#ff6b35]' : 'text-white hover:text-[#ff6b35]'}`}>研修プログラム</a>
            <a href="#flow" className={`text-sm font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-[#ff6b35]' : 'text-white hover:text-[#ff6b35]'}`}>導入の流れ</a>
            <a href="#faq" className={`text-sm font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-[#ff6b35]' : 'text-white hover:text-[#ff6b35]'}`}>よくある質問</a>
            <a href="#contact" className="bg-[#ff6b35] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#e55a2b] transition-colors whitespace-nowrap cursor-pointer">お問い合わせ</a>
          </div>
        </div>
      </nav>

      {/* Hero セクション */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://readdy.ai/api/search-image?query=Construction%20site%20with%20foreign%20workers%20and%20Japanese%20supervisors%20working%20together%20in%20safety%20gear%2C%20modern%20construction%20environment%20with%20scaffolding%20and%20equipment%2C%20professional%20training%20atmosphere%2C%20bright%20daylight%2C%20clean%20organized%20workspace%2C%20teamwork%20and%20collaboration%2C%20high%20quality%20professional%20photography%2C%20realistic%20documentary%20style&width=1920&height=1080&seq=hero001&orientation=landscape" 
            alt="建設現場での研修風景" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <p className="text-[#ff6b35] text-sm font-medium tracking-widest mb-4 uppercase">育成就労制度 対応済み</p>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                その研修センター選び、<br />数百万円の損失に<br />なるかもしれません。
              </h1>
              <p className="text-white/90 text-lg md:text-xl font-light mb-4 leading-relaxed">
                育成就労制度への移行でN4合格が必須になりました。<br />
                N4不合格＝帰国。受け入れにかけた<span className="text-[#ff6b35] font-bold">300万円</span>が水の泡です。
              </p>
              <p className="text-white/70 text-base mb-10">
                建設業特化・少人数制・職種別テキスト。入国直後からN4対策を一気通貫で提供します。
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="bg-[#ff6b35] text-white px-8 py-4 rounded-lg text-base font-medium hover:bg-[#e55a2b] transition-colors whitespace-nowrap cursor-pointer inline-block">
                  無料相談・施設見学を申し込む
                </a>
                <a href="#download" className="bg-white/10 text-white px-8 py-4 rounded-lg text-base font-medium border border-white/40 hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer inline-block">
                  資料をダウンロード
                </a>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
                <p className="text-white/70 text-xs tracking-widest uppercase mb-2">シエットの実績</p>
                {[
                  { value: '335人', label: '累計研修修了者' },
                  { value: '48社以上', label: '受け入れ企業実績' },
                  { value: '東北6県+', label: '活躍中の配属エリア' },
                  { value: '14期', label: '2021年設立・継続運営中' }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-[#ff6b35]">{stat.value}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 経営者の悩みセクション */}
      <section className="py-24 bg-[#f5f7fa]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-serif text-[#1a2332] text-center mb-16">
            こんな課題、抱えていませんか？
          </h2>
          {/* 制度リスク警告バナー */}
          <div className="bg-[#e63946] rounded-xl p-8 mb-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-error-warning-line text-white text-3xl"></i>
            </div>
            <div>
              <p className="text-white font-bold text-xl mb-2">【制度改正 警告】育成就労制度への移行でルールが変わりました</p>
              <p className="text-white/90 text-base leading-relaxed">
                在留期間が5年→<strong className="text-yellow-300">3年</strong>に短縮。長期就労（特定技能への移行）には<strong className="text-yellow-300">N4合格が必須</strong>です。
                N4不合格＝帰国。受け入れにかかった<strong className="text-yellow-300">約300万円</strong>（渡航費・手続き費・教育費）が回収不能になります。
                安い研修センターを選ぶリスクが、制度改正で一気に顕在化しています。
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'N4不合格→帰国→300万円の損失',
                description: '育成就労制度で在留3年・N4合格必須に。安い研修センターを選んで不合格になると、採用・渡航・手続きにかかった300万円が全額損失になります。'
              },
              {
                title: '現場の安全事故リスク',
                description: '言葉の壁やコミュニケーション不足により、安全指示が伝わらず事故のリスクが高まっている。現場用語を研修で習っていないと、指示が通じない。'
              },
              {
                title: '外国人材の教育が属人化',
                description: '現場任せの教育で品質にばらつきがあり、体系的な育成ができていない。「バックホー」「コンパネ」すら通じないまま配属される。'
              },
              {
                title: '配属後すぐ辞められてしまう',
                description: '生活サポートの不足や孤独感から、配属後3〜6ヶ月で離職・失踪するケースが増えている。受け入れ企業の負担が膨らむ。'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-10 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#e63946] rounded-full flex items-center justify-center mb-6">
                  <i className="ri-alert-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#1a2332] mb-4">{item.title}</h3>
                <p className="text-base text-[#6c757d] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 解決策セクション */}
      <section id="service" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff6b35]"></div>
              <img 
                src="https://readdy.ai/api/search-image?query=Professional%20construction%20training%20classroom%20with%20foreign%20workers%20learning%20Japanese%20language%20and%20safety%20procedures%2C%20instructor%20teaching%20at%20whiteboard%2C%20students%20taking%20notes%2C%20bright%20modern%20training%20facility%2C%20educational%20atmosphere%2C%20clean%20simple%20background%2C%20professional%20photography%2C%20realistic%20style&width=800&height=800&seq=solution001&orientation=squarish" 
                alt="研修風景" 
                className="w-full h-[500px] object-cover rounded-2xl ml-5"
              />
            </div>
            <div>
              <p className="text-[#ff6b35] text-sm font-light tracking-widest mb-4">CIET SOLUTION</p>
              <h2 className="text-5xl font-serif text-[#1a2332] mb-10 leading-tight">
                建設業に特化した、<br />一気通貫の育成プログラム
              </h2>
              <div className="space-y-8">
                {[
                  {
                    title: '建設特化の研修設計',
                    description: '建設業界の実務に即したカリキュラムで、現場で本当に必要なスキルを習得できます。'
                  },
                  {
                    title: '安全×日本語×生活適応',
                    description: '安全教育、日本語指導、生活サポートを統合し、総合的な育成を実現します。'
                  },
                  {
                    title: '少人数での高品質育成',
                    description: '一人ひとりに目が届く少人数制で、確実なスキル定着を図ります。'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-3 h-3 bg-[#ff6b35] rounded-full mt-2"></div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1a2332] mb-2">{item.title}</h3>
                      <p className="text-base text-[#6c757d] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 研修で得られる成果セクション */}
      <section className="py-20 bg-[#1a2332]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-serif text-white text-center mb-16">
            研修で得られる4つの成果
          </h2>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              {
                number: '01',
                title: '配属後の立ち上がりが早い',
                description: '即戦力として現場に貢献できる状態で配属されます。'
              },
              {
                number: '02',
                title: '事故・トラブルの抑制',
                description: '安全意識とコミュニケーション力で事故を未然に防ぎます。'
              },
              {
                number: '03',
                title: '現場コミュニケーションの改善',
                description: '日本語能力向上により、指示の理解と報告が円滑になります。'
              },
              {
                number: '04',
                title: '定着率向上',
                description: '生活適応支援により、長期的な就労が実現します。'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
                <div className="text-7xl font-bold text-[#ff6b35] opacity-30 mb-4">{item.number}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* プログラム概要セクション */}
      <section id="program" className="py-24 bg-[#faf8f3]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-serif text-[#1a2332] mb-20">研修プログラム</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#1a2332] transform -translate-x-1/2 hidden md:block"></div>
            <div className="space-y-16">
              {[
                {
                  step: '1',
                  title: '入国後講習',
                  description: '日本での生活に必要な基礎知識、法令、マナーを学び、スムーズな生活立ち上げをサポートします。',
                  align: 'left'
                },
                {
                  step: '2',
                  title: '現場向け日本語',
                  description: '建設現場で使用する専門用語や指示の理解、報告・連絡・相談の実践的な日本語を習得します。',
                  align: 'right'
                },
                {
                  step: '3',
                  title: '安全衛生・基本動作',
                  description: '建設現場の安全ルール、保護具の使用方法、危険予知訓練など、安全第一の意識を徹底します。',
                  align: 'left'
                },
                {
                  step: '4',
                  title: '建設技能基礎',
                  description: '各職種に応じた基本技能を実習形式で学び、現場配属後すぐに活躍できる力を養います。',
                  align: 'right'
                }
              ].map((item, index) => (
                <div key={index} className={`flex items-center ${item.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`w-full md:w-5/12 ${item.align === 'right' ? 'md:text-right' : ''}`}>
                    <div className="bg-white rounded-xl shadow-md p-8 relative">
                      <div className="absolute top-8 left-8 w-10 h-10 bg-[#ff6b35] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{item.step}</span>
                      </div>
                      <div className="pl-16">
                        <h3 className="text-2xl font-bold text-[#1a2332] mb-3">{item.title}</h3>
                        <p className="text-base text-[#6c757d] leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-6 h-6 bg-[#ff6b35] rounded-full border-4 border-[#faf8f3]"></div>
                  </div>
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROI訴求セクション */}
      <section className="py-20 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-serif text-white leading-tight mb-16">
            教育投資が、事故・離職・<br className="md:hidden" />手戻りコストを減らす
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { value: '335人', label: '累計研修修了者（2021年〜）' },
              { value: '48社', label: '受け入れ企業実績（東北6県+）' },
              { value: '22万円', label: '研修費用（業界標準8万円の約2.75倍の価値）' }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-10 text-center">
                <div className="text-6xl font-bold text-[#1a2332] mb-3">{item.value}</div>
                <div className="text-lg text-[#6c757d]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 比較表セクション */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#ff6b35] text-sm font-medium tracking-widest text-center mb-4 uppercase">なぜシエットか</p>
          <h2 className="text-5xl font-serif text-[#1a2332] text-center mb-16">
            従来の研修センターとの違い
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left bg-gray-100 text-[#6c757d] text-sm font-medium rounded-tl-xl w-1/3">比較項目</th>
                  <th className="p-4 text-center bg-gray-100 text-[#6c757d] text-sm font-medium w-1/3">従来の研修センター<br /><span className="text-xs font-normal">（費用：約8万円）</span></th>
                  <th className="p-4 text-center bg-[#ff6b35] text-white text-sm font-bold rounded-tr-xl w-1/3">シエット（CIET）<br /><span className="text-xs font-normal">（費用：22万円）</span></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: 'コンセプト', conventional: '「安さ」の追求', ciet: '建設業に特化した教育と環境の提供' },
                  { item: 'クラス人数', conventional: '30〜34人以上の詰め込み教育', ciet: '原則上限24人。一人ひとりに目が届く少人数制' },
                  { item: '宿泊環境', conventional: '大部屋に多人数（「駐車場のような場所」と実習生が嘆く）', ciet: '個室または2人1部屋。プライバシーと休息を尊重' },
                  { item: '日本語教育', conventional: '汎用的な教科書中心', ciet: '「バックホー」「コンパネ」など現場用語・タメ口指示を徹底特訓' },
                  { item: '試験対策（初級試験）', conventional: '受け入れ企業に丸投げ（現場負担が大きい）', ciet: '職種別の独自テキストを使用し、基礎学習をセンターで完了' },
                  { item: '生活・マナー指導', conventional: '研修施設での生活管理のみ', ciet: '給与明細の見方・スマホで日本語入力・LINE連絡まで指導' },
                  { item: '資格・免許取得', conventional: '企業が別途手配・日程調整', ciet: '同じ敷地内でコベルコ教習所と提携。車両系免許をワンストップで取得' },
                  { item: '制度変更への対応', conventional: '特になし（企業任せ）', ciet: '入国直後からN4・N5レベルの漢字学習の下地づくりを実施' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 text-sm font-bold text-[#1a2332] border-b border-gray-100">{row.item}</td>
                    <td className="p-4 text-sm text-[#6c757d] border-b border-gray-100 text-center">{row.conventional}</td>
                    <td className="p-4 text-sm text-[#1a2332] font-medium border-b border-gray-100 text-center bg-orange-50">{row.ciet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[#6c757d] mt-6">※ 従来センターの情報は受け入れ企業・実習生からのヒアリングを基に作成</p>
        </div>
      </section>

      {/* 配属エリアマップセクション */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#ff6b35] text-sm font-medium tracking-widest text-center mb-4 uppercase">全国48社の実績</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1a2332] text-center mb-4">
            東北6県を中心に、全国に広がる実績
          </h2>
          <p className="text-center text-[#6c757d] mb-10 text-lg">
            岩手・宮城・秋田・山形・青森・福島を中心に、<strong>48社</strong>の企業で実習生が活躍しています。
          </p>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <CietMap />
          </div>
          <p className="text-center text-sm text-[#6c757d] mt-4">
            ※ ピンにカーソルを合わせると企業名・所在地を確認できます
          </p>
        </div>
      </section>

      {/* 導入フローセクション */}
      <section id="flow" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-serif text-[#1a2332] text-center mb-16">導入までの流れ</h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {[
              '相談',
              '研修設計',
              '受入準備',
              '入国後講習',
              '配属',
              '継続支援'
            ].map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="bg-[#f5f7fa] rounded-lg w-40 h-32 flex flex-col items-center justify-center p-6 relative">
                  <div className="w-8 h-8 bg-[#ff6b35] rounded-full flex items-center justify-center mb-3">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <div className="text-base font-bold text-[#1a2332] text-center">{step}</div>
                </div>
                {index < 5 && (
                  <i className="ri-arrow-right-line text-[#ff6b35] text-2xl mx-2"></i>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 料金導線セクション */}
      <section className="py-20 bg-[#f5f7fa]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif text-[#1a2332] mb-6">料金・サービス詳細</h2>
          <p className="text-lg text-[#6c757d] mb-10">詳細は資料にてご提示いたします</p>
          <a href="#download" className="inline-flex items-center gap-3 bg-[#ff6b35] text-white px-12 py-5 rounded-xl text-base font-medium hover:bg-[#e55a2b] transition-colors whitespace-nowrap cursor-pointer">
            サービス資料請求
            <i className="ri-arrow-right-line text-xl"></i>
          </a>
        </div>
      </section>

      {/* FAQセクション */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-serif text-[#1a2332] mb-12">よくあるご質問</h2>
          <div className="space-y-4">
            {[
              {
                question: '何名から対応可能ですか？',
                answer: '1名様から対応可能です。少人数でも質の高い研修を提供いたします。企業様の受入れ規模に合わせて柔軟にプログラムを設計いたしますので、お気軽にご相談ください。'
              },
              {
                question: '地域外でも利用できますか？',
                answer: 'はい、全国対応しております。オンライン研修と対面研修を組み合わせることで、地域を問わずサービスをご提供できます。詳細はお問い合わせください。'
              },
              {
                question: '監理団体と未契約でも相談可能ですか？',
                answer: 'もちろん可能です。監理団体のご紹介から受入れ準備、研修まで一貫してサポートいたします。初めての外国人材受入れでも安心してお任せください。'
              },
              {
                question: '特定技能への移行支援はありますか？',
                answer: 'はい、技能実習から特定技能への移行支援も行っております。試験対策から在留資格変更手続きまで、トータルでサポートいたします。'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 bg-[#ff6b35] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">Q</span>
                    </div>
                    <span className="text-lg font-bold text-[#1a2332]">{faq.question}</span>
                  </div>
                  <i className={`ri-arrow-down-s-line text-2xl text-[#1a2332] transition-transform ${openFaq === index ? 'rotate-180' : ''}`}></i>
                </button>
                {openFaq === index && (
                  <div className="bg-[#f5f7fa] p-6 border-t border-gray-200">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-[#6c757d] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">A</span>
                      </div>
                      <p className="text-base text-[#6c757d] leading-relaxed flex-1">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 最終CTAセクション */}
      <section id="contact" className="py-20 bg-[#1a2332]">
        <div className="max-w-5xl mx-auto px-6">
          {/* 1st CTA */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-10">
              まずは資料で詳細をご確認ください
            </h2>
            <a href="#download" className="inline-block bg-[#ff6b35] text-white px-12 py-5 rounded-xl text-base font-medium hover:bg-[#e55a2b] transition-colors whitespace-nowrap cursor-pointer mb-4">
              ホワイトペーパーをダウンロード
            </a>
            <p className="text-white/70 text-sm">※メールアドレスのみで即時ダウンロード可能</p>
          </div>

          {/* 区切り線 */}
          <div className="border-t border-white/20 my-16"></div>

          {/* 2nd CTA */}
          <div className="text-center">
            <h3 className="text-3xl text-white mb-8">個別相談をご希望の方</h3>
            <a href="#consultation" className="inline-flex items-center gap-3 bg-transparent text-white px-10 py-4 rounded-lg text-base font-medium border-2 border-white hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer">
              無料相談・面談予約
              <i className="ri-arrow-right-line text-xl"></i>
            </a>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-[#1a2332] pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-16">
            {/* 第1カラム */}
            <div>

              <p className="text-white/70 text-sm leading-relaxed">
                建設業界に特化した外国人材育成サービスを提供し、人手不足の解決と現場の安全性向上に貢献します。
              </p>
            </div>

            {/* 第2カラム */}
            <div>
              <h4 className="text-white text-base tracking-wide mb-6">お問い合わせ</h4>
              <form className="mb-4" data-readdy-form id="footer-contact-form">
                <input type="hidden" name="form_type" value="newsletter" />
                <div className="flex items-center border-b border-white/30 pb-2">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="メールアドレス" 
                    className="bg-transparent text-white placeholder-white/60 text-sm flex-1 outline-none"
                    required
                  />
                  <button type="submit" className="text-[#ff6b35] hover:text-[#e55a2b] transition-colors cursor-pointer">
                    <i className="ri-arrow-right-line text-xl"></i>
                  </button>
                </div>
              </form>
              <a href="#privacy" className="text-white/60 text-xs hover:text-white/80 transition-colors">プライバシーポリシー</a>
            </div>

            {/* 第3カラム */}
            <div>
              <h4 className="text-white text-base tracking-wide mb-6">サービス</h4>
              <div className="space-y-4">
                <a href="#service1" className="block text-white/80 text-sm hover:text-white transition-colors">入国後講習</a>
                <a href="#service2" className="block text-white/80 text-sm hover:text-white transition-colors">技能実習支援</a>
                <a href="#service3" className="block text-white/80 text-sm hover:text-white transition-colors">特定技能支援</a>
              </div>
            </div>

            {/* 第4カラム */}
            <div>
              <h4 className="text-white text-base tracking-wide mb-6">フォロー</h4>
              <div className="space-y-4">
                <a href="#facebook" className="block text-white/80 text-sm hover:text-white transition-colors">Facebook</a>
                <a href="#linkedin" className="block text-white/80 text-sm hover:text-white transition-colors">LinkedIn</a>
                <a href="#youtube" className="block text-white/80 text-sm hover:text-white transition-colors">YouTube</a>
              </div>
            </div>
          </div>

          {/* ブランドエリア */}
          <div className="border-t border-white/20 pt-16 mb-10">
            <div className="text-center text-[#d4c5b0] text-8xl font-bold tracking-tighter mb-8">
              CIET
            </div>
          </div>

          {/* コピーライト */}
          <div className="text-center">
            <p className="text-white/50 text-xs mb-2">© 2025 CIET. All rights reserved.</p>
            <a href="https://readdy.ai/?origin=logo" target="_blank" rel="noopener noreferrer" className="text-white/40 text-xs hover:text-white/60 transition-colors">
              Powered by Readdy
            </a>
          </div>
        </div>
      </footer>

      {/* 資料請求モーダル */}
      <div id="download" className="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative">
          <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-2xl"></i>
          </button>
          <h3 className="text-3xl font-bold text-[#1a2332] mb-6">資料請求フォーム</h3>
          <form data-readdy-form id="download-form" action="https://readdy.ai/api/form/d4r2vgir20r5k3vfktfg" method="POST">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">会社名 *</label>
                <input type="text" name="company_name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">お名前 *</label>
                <input type="text" name="name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス *</label>
                <input type="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">電話番号</label>
                <input type="tel" name="phone" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none" />
              </div>
              <button type="submit" className="w-full bg-[#ff6b35] text-white py-4 rounded-lg font-medium hover:bg-[#e55a2b] transition-colors whitespace-nowrap cursor-pointer">
                資料をダウンロード
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 無料相談モーダル */}
      <div id="consultation" className="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
          <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-2xl"></i>
          </button>
          <h3 className="text-3xl font-bold text-[#1a2332] mb-6">無料相談予約フォーム</h3>
          <form data-readdy-form id="consultation-form" action="https://readdy.ai/api/form/d4r2vgir20r5k3vfktg0" method="POST">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">会社名 *</label>
                <input type="text" name="company_name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">お名前 *</label>
                <input type="text" name="name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス *</label>
                <input type="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">電話番号 *</label>
                <input type="tel" name="phone" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">希望日時（第1希望） *</label>
                <input type="datetime-local" name="preferred_date_1" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">希望日時（第2希望）</label>
                <input type="datetime-local" name="preferred_date_2" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ご相談内容</label>
                <textarea name="message" rows={4} maxLength={500} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none resize-none" placeholder="500文字以内でご記入ください"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#ff6b35] text-white py-4 rounded-lg font-medium hover:bg-[#e55a2b] transition-colors whitespace-nowrap cursor-pointer">
                予約を送信
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// フォーム送信処理
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // モーダル開閉処理
    const openModal = (modalId: string) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    };

    const closeModal = (modalId: string) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    };

    // リンククリックでモーダル表示
    document.querySelectorAll('a[href="#download"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('download');
      });
    });

    document.querySelectorAll('a[href="#consultation"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('consultation');
      });
    });

    // モーダル閉じるボタン
    document.querySelectorAll('.ri-close-line').forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal('download');
        closeModal('consultation');
      });
    });

    // モーダル外クリックで閉じる
    document.querySelectorAll('.fixed.inset-0').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal('download');
          closeModal('consultation');
        }
      });
    });

    // フォーム送信処理
    const handleFormSubmit = async (e: Event, formId: string, actionUrl: string) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // textareaの文字数チェック
      const textarea = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
      if (textarea && textarea.value.length > 500) {
        alert('ご相談内容は500文字以内でご記入ください。');
        return;
      }

      try {
        const response = await fetch(actionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(formData as any).toString()
        });

        if (response.ok) {
          alert('送信が完了しました。ありがとうございます。');
          form.reset();
          closeModal(formId);
        } else {
          alert('送信に失敗しました。もう一度お試しください。');
        }
      } catch (error) {
        alert('送信に失敗しました。もう一度お試しください。');
      }
    };

    const downloadForm = document.getElementById('download-form');
    if (downloadForm) {
      downloadForm.addEventListener('submit', (e) => handleFormSubmit(e, 'download', 'https://readdy.ai/api/form/d4r2vgir20r5k3vfktfg'));
    }

    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
      consultationForm.addEventListener('submit', (e) => handleFormSubmit(e, 'consultation', 'https://readdy.ai/api/form/d4r2vgir20r5k3vfktg0'));
    }

    const footerForm = document.getElementById('footer-contact-form');
    if (footerForm) {
      footerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        try {
          const response = await fetch('https://readdy.ai/api/form/d4r2vgir20r5k3vfktfg', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData as any).toString()
          });

          if (response.ok) {
            alert('ご登録ありがとうございます。');
            form.reset();
          } else {
            alert('送信に失敗しました。もう一度お試しください。');
          }
        } catch (error) {
          alert('送信に失敗しました。もう一度お試しください。');
        }
      });
    }
  });
}