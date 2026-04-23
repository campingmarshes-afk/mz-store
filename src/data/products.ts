export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  features: string[];
}

export const products: Product[] = [
  {
    id: "obj-001",
    name: "بيانو ياماها الكلاسيكي",
    description: "بيانو صوتي رائع بصوت نقي وعميق، مثالي للعزف الكلاسيكي والحديث. يتميز بمفاتيح خشبية متينة.",
    price: 3500.00,
    category: "بيانو",
    images: [
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1000&auto=format&fit=crop"
    ],
    features: ["مفاتيح خشبية", "صوت محيطي", "دواسات نحاسية"]
  },
  {
    id: "obj-002",
    name: "جيتار كلاسيكي إسباني",
    description: "جيتار صناعة يدوية بأخشاب طبيعية يعطي نغمات دافئة ورنانة، مناسب جداً لعشاق الفلامنكو الكلاسيكي.",
    price: 320.00,
    category: "جيتار",
    images: [
      "https://images.unsplash.com/photo-1550985543-f47f38aee660?q=80&w=1000&auto=format&fit=crop"
    ],
    features: ["خشب الماهوجني", "أوتار نايلون", "صناعة يدوية"]
  },
  {
    id: "obj-003",
    name: "عود عربي أصيل",
    description: "عود بتصميم شرقي وزخرفات رائعة، مصنوع من أجود أنواع الأخشاب ليقدم لك المقامات العربية بامتياز.",
    price: 450.00,
    category: "عود",
    images: [
      "https://images.unsplash.com/photo-1623864070005-728b7eaddce1?q=80&w=1000&auto=format&fit=crop"
    ],
    features: ["ظهر مقوس جوز", "أوتار عالية الجودة", "مفاتيح الأبنوس"]
  },
  {
    id: "obj-004",
    name: "كمان احترافي مع القوس",
    description: "كمان مصمم للمحترفين بصوت نقي وجهوري، يتضمن القوس الخشبي وحقيبة فاخرة للحماية.",
    price: 280.00,
    category: "كمان",
    images: [
      "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?q=80&w=1000&auto=format&fit=crop"
    ],
    features: ["خشب القيقب الجبلي", "قوس شعر حصان منغولي", "يتضمن حقيبة"]
  },
  {
    id: "obj-005",
    name: "جيتار كهربائي فيندر",
    description: "جيتار كهربائي بتصميم عصري وأصوات متعددة تناسب الروك، البوب، والبلوز مع التقاط صوت ممتاز.",
    price: 850.00,
    category: "جيتار كهربائي",
    images: [
      "https://images.unsplash.com/photo-1554104707-a76b270e4bbc?q=80&w=1000&auto=format&fit=crop"
    ],
    features: ["بيك أب مزدوج", "عنق روزوود", "تحكم بالتون والفاليوم"]
  }
];

export const getFeaturedProducts = () => products.slice(0, 3);

