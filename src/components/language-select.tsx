"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSelectProps {
  value: string;
  onChange: (value: string | null) => void;
  disabled?: boolean;
}

const LANGUAGES = [
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "zh-CN", label: "中文", flag: "🇨🇳" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export default function LanguageSelect({
  value,
  onChange,
  disabled = false,
}: LanguageSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="language-select">타겟 언어 (더빙할 언어)</Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger id="language-select" className="w-full">
          <SelectValue placeholder="언어를 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
