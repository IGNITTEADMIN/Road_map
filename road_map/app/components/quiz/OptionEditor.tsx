//./api/components/quiz/OptionEditor.tsx
import { Option } from "./types";
import { uploadToCloudinary } from "./cloudinary";
import MathRenderer from "@/app/components/MathRenderer";

interface Props {
  option: Option;
  onChange: (o: Option) => void;
}

export default function OptionEditor({ option, onChange }: Props) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-3">
      <input
        type="text"
        value={option.text}
        onChange={e => onChange({ ...option, text: e.target.value })}
        placeholder="Option text"
        className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:border-[#ff6b00] focus:outline-none transition-colors"
      />
      <div className="p-3 rounded-lg bg-black/30 text-white text-sm">
        <MathRenderer text={option.text} />
      </div>

      <div>
        <label className="text-white font-medium block mb-2">Option Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={async e => {
            const f = e.target.files?.[0];
            if (!f) return;
            const url = await uploadToCloudinary(f, "Options");
            if (url) onChange({ ...option, imageUrl: url });
          }}
          className="text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#ff6b00] file:text-black file:font-semibold hover:file:bg-orange-500 transition-colors"
        />
      </div>
    </div>
  );
}