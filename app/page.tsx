import styles from "./pickle-site.module.scss";

const products = [
  { name: "古法萝卜干", note: "三晒两腌，脆香回甘" },
  { name: "湖盐青瓜片", note: "低盐发酵，清爽开胃" },
  { name: "陈坛酸豆角", note: "老坛慢酿，酸香醇厚" },
];

export default function App() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>百年酱艺 · 当代风味</p>
        <h1>酱心传承，味起东方</h1>
        <p>
          为传统酱菜品牌打造的中国风整站方案：从品牌故事、爆款产品到渠道合作，
          一页呈现“老手艺 + 新审美”的商业势能。
        </p>
        <div className={styles.ctaRow}>
          <a href="#products">查看主打酱菜</a>
          <button>预约试吃合作</button>
        </div>
      </section>

      <section className={styles.story}>
        <h2>一坛一味，敬时间</h2>
        <p>
          我们坚持古法陶坛发酵，遵循二十四节气调味节奏，精选本地时蔬与天然湖盐。
          每一口都保留“脆、鲜、香、润”的层次，做饭桌上的“点睛之味”。
        </p>
      </section>

      <section id="products" className={styles.products}>
        <h2>主打系列</h2>
        <div className={styles.cards}>
          {products.map((item) => (
            <article key={item.name} className={styles.card}>
              <h3>{item.name}</h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.metrics}>
        <div>
          <strong>120+</strong>
          <span>合作门店</span>
        </div>
        <div>
          <strong>98%</strong>
          <span>复购好评率</span>
        </div>
        <div>
          <strong>36h</strong>
          <span>冷链发货时效</span>
        </div>
      </section>

      <section className={styles.contact}>
        <h2>渠道合作 / 礼盒定制</h2>
        <p>团购、电商、餐饮联名欢迎洽谈，让中国酱菜走进更多年轻餐桌。</p>
        <button>获取品牌手册</button>
      </section>
    </main>
  );
}
