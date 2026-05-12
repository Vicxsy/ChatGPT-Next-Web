"use client";

import { useMemo, useState } from "react";

import styles from "./web-builder.module.scss";

type SectionKind = "hero" | "feature" | "cta" | "custom";

interface PageSection {
  id: number;
  kind: SectionKind;
  title: string;
  body: string;
  accent: string;
}

const sectionLabels: Record<SectionKind, string> = {
  hero: "主视觉",
  feature: "功能亮点",
  cta: "行动召唤",
  custom: "自定义",
};

const defaultSections: PageSection[] = [
  {
    id: 1,
    kind: "hero",
    title: "用拖拽的方式生成你的下一张着陆页",
    body: "通过组件化的内容块快速拼装页面，实时查看效果，无需手写 HTML/CSS。",
    accent: "#1d93ab",
  },
  {
    id: 2,
    kind: "feature",
    title: "模块化组件库",
    body: "复用文本、图片、卡片、CTA 等组件，让内容编辑更高效。",
    accent: "#0f766e",
  },
  {
    id: 3,
    kind: "cta",
    title: "立即发布",
    body: "生成静态页面代码，一键复制即可部署到任意静态托管服务。",
    accent: "#f97316",
  },
];

const createSection = (id: number): PageSection => ({
  id,
  kind: "custom",
  title: "新的内容分区",
  body: "添加描述文案，调整布局和配色以匹配品牌调性。",
  accent: "#1d93ab",
});

export default function WebBuilderPage() {
  const [pageName, setPageName] = useState("AI Web Builder");
  const [themeColor, setThemeColor] = useState("#1d93ab");
  const [sections, setSections] = useState<PageSection[]>(defaultSections);
  const [copied, setCopied] = useState(false);

  const highlightedSection = useMemo(
    () => sections.find((section) => section.kind === "hero") ?? sections[0],
    [sections],
  );

  const generatedHtml = useMemo(() => {
    const sectionHtml = sections
      .map(
        (section) =>
          `\n        <section class="section section-${section.kind}">\n          <div class="section-accent" style="background:${section.accent}"></div>\n          <div class="section-copy">\n            <h2>${section.title}</h2>\n            <p>${section.body}</p>\n          </div>\n        </section>`,
      )
      .join("\n");

    return `<!doctype html>\n<html lang=\"zh-CN\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>${pageName}</title>\n    <style>\n      :root {\n        --accent: ${themeColor};\n        font-family: 'Inter', 'PingFang SC', 'Noto Sans', sans-serif;\n        color: #1f2937;\n        background: #f5f7fb;\n      }\n      body {\n        margin: 0;\n        padding: 32px;\n        line-height: 1.6;\n      }\n      .hero {\n        background: linear-gradient(135deg, var(--accent), #38bdf8);\n        color: white;\n        padding: 48px;\n        border-radius: 24px;\n        box-shadow: 0 20px 60px rgba(0,0,0,0.15);\n        margin-bottom: 24px;\n      }\n      .hero h1 {\n        margin: 0 0 12px;\n        font-size: 32px;\n        letter-spacing: -0.02em;\n      }\n      .hero p {\n        margin: 0;\n        font-size: 16px;\n        opacity: .95;\n      }\n      .section {\n        background: white;\n        border-radius: 16px;\n        padding: 24px;\n        display: grid;\n        grid-template-columns: 12px 1fr;\n        gap: 16px;\n        align-items: flex-start;\n        box-shadow: 0 12px 32px rgba(0,0,0,0.08);\n      }\n      .section + .section {\n        margin-top: 18px;\n      }\n      .section-accent {\n        width: 12px;\n        height: 100%;\n        border-radius: 999px;\n        background: var(--accent);\n      }\n      .section-copy h2 {\n        margin: 0 0 8px;\n        font-size: 20px;\n      }\n      .section-copy p {\n        margin: 0;\n        color: #4b5563;\n      }\n    </style>\n  </head>\n  <body>\n    <main>\n      <header class="hero">\n        <h1>${
      highlightedSection?.title ?? pageName
    }</h1>\n        <p>${
      highlightedSection?.body ?? "点击左侧添加主视觉文案"
    }</p>\n      </header>\n      ${sectionHtml}\n    </main>\n  </body>\n</html>`;
  }, [
    highlightedSection?.body,
    highlightedSection?.title,
    pageName,
    sections,
    themeColor,
  ]);

  const updateSection = (id: number, data: Partial<PageSection>) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, ...data } : section,
      ),
    );
  };

  const removeSection = (id: number) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
  };

  const addSection = () => {
    setSections((prev) => [...prev, createSection(Date.now())]);
  };

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(generatedHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("复制失败", error);
    }
  };

  const previewHtml = () => {
    const blob = new Blob([generatedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>在线网页制作工具</div>
      <div className={styles.grid}>
        <section className={styles.builder}>
          <header>
            <div>
              <p className={styles.label}>项目名称</p>
              <input
                value={pageName}
                onChange={(event) => setPageName(event.target.value)}
                className={styles.input}
              />
            </div>
            <div>
              <p className={styles.label}>品牌主色</p>
              <input
                type="color"
                value={themeColor}
                onChange={(event) => setThemeColor(event.target.value)}
                className={styles.color}
              />
            </div>
          </header>

          <div className={styles.sectionList}>
            {sections.map((section) => (
              <div key={section.id} className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div>
                    <p className={styles.label}>区块类型</p>
                    <select
                      value={section.kind}
                      onChange={(event) =>
                        updateSection(section.id, {
                          kind: event.target.value as SectionKind,
                        })
                      }
                      className={styles.select}
                    >
                      {Object.entries(sectionLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className={styles.delete}
                    onClick={() => removeSection(section.id)}
                  >
                    删除
                  </button>
                </div>
                <label className={styles.label}>
                  标题
                  <input
                    className={styles.input}
                    value={section.title}
                    onChange={(event) =>
                      updateSection(section.id, { title: event.target.value })
                    }
                  />
                </label>
                <label className={styles.label}>
                  描述
                  <textarea
                    className={styles.textarea}
                    value={section.body}
                    onChange={(event) =>
                      updateSection(section.id, { body: event.target.value })
                    }
                  />
                </label>
                <label className={styles.label}>
                  重点色
                  <input
                    type="color"
                    className={styles.color}
                    value={section.accent}
                    onChange={(event) =>
                      updateSection(section.id, { accent: event.target.value })
                    }
                  />
                </label>
              </div>
            ))}
          </div>

          <button className={styles.add} onClick={addSection}>
            + 添加新内容块
          </button>
        </section>

        <section className={styles.preview}>
          <header className={styles.previewHeader}>
            <div>
              <p className={styles.label}>实时预览</p>
              <p className={styles.subtitle}>根据左侧配置即时生成落地页雏形</p>
            </div>
            <div className={styles.previewActions}>
              <button className={styles.ghost} onClick={previewHtml}>
                在新窗口预览
              </button>
              <button className={styles.primary} onClick={copyHtml}>
                {copied ? "已复制" : "复制生成的 HTML"}
              </button>
            </div>
          </header>

          <div className={styles.previewSurface}>
            <div
              className={styles.previewHero}
              style={{ background: themeColor }}
            >
              <p className={styles.kicker}>在线制作 · 响应式</p>
              <h1>{highlightedSection?.title ?? pageName}</h1>
              <p className={styles.previewLead}>{highlightedSection?.body}</p>
            </div>

            <div className={styles.previewGrid}>
              {sections.map((section) => (
                <article key={section.id} className={styles.previewCard}>
                  <div
                    className={styles.accentDot}
                    style={{ background: section.accent }}
                  />
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                  <span className={styles.tag}>
                    {sectionLabels[section.kind]}
                  </span>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.codeBlock}>
            <p className={styles.label}>生成的 HTML 结构</p>
            <textarea className={styles.code} readOnly value={generatedHtml} />
          </div>
        </section>
      </div>
    </div>
  );
}
