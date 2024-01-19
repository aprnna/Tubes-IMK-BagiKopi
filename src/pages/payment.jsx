import React from "react";

export function Payment() {
  return (
    <div className="flex max-w-[480px] w-full flex-col items-center mx-auto">
      <span className="bg-stone-100 self-stretch flex w-full flex-col items-center mt-3.5 pt-5 pb-px px-5">
        <div className="text-black text-center text-xl font-bold">
          Pembayaran
        </div>
        <div className="text-black text-center text-3xl font-bold w-[244px] mt-10">
          Rp 20.000
          <br />
        </div>
        <div className="bg-white self-stretch flex items-stretch justify-between gap-5 mt-6 pl-5 pr-14 py-3 rounded-[34px]">
          <div className="flex flex-col items-start">
            <span className="flex w-[127px] max-w-full items-stretch gap-4 ml-4">
              <img
                loading="lazy"
                alt=""
                srcSet="..."
                className="aspect-[1.12] object-contain object-center w-full overflow-hidden shrink-0 flex-1 rounded-[50%]"
              />
              <div className="text-black text-center text-lg font-bold self-center my-auto">
                Gopay
              </div>
            </span>
            <span className="self-stretch flex items-stretch justify-between gap-1 mt-5">
              <img
                loading="lazy"
                srcSet="..."
                alt=""
                className="aspect-[1.52] object-contain object-center w-[88px] overflow-hidden shrink-0 max-w-full rounded-[50%]"
              />
              <div className="text-black text-lg font-bold my-auto">Ovo</div>
            </span>
            <div className="self-stretch flex flex-col items-stretch mt-5 pl-4">
              <span className="flex items-stretch justify-between gap-4">
                <img
                  loading="lazy"
                  srcSet="..."
                  alt=""
                  className="aspect-[1.12] object-contain object-center w-[58px] overflow-hidden shrink-0 max-w-full rounded-[50%]"
                />
                <div className="text-black text-lg font-bold mt-3">Dana</div>
              </span>
              <span className="flex items-stretch justify-between gap-4 mt-5">
                <img
                  loading="lazy"
                  srcSet="..."
                  alt=""
                  className="aspect-[1.12] object-contain object-center w-[58px] overflow-hidden shrink-0 max-w-full rounded-[50%]"
                />
                <div className="text-black text-lg font-bold my-auto">Qris</div>
              </span>
              <span className="flex items-stretch justify-between gap-4 mt-5">
                <img
                  loading="lazy"
                  srcSet="..."
                  alt=""
                  className="aspect-[1.09] object-contain object-center w-[58px] overflow-hidden shrink-0 max-w-full rounded-[50%]"
                />
                <div className="text-black text-lg font-bold self-center grow whitespace-nowrap my-auto">
                  Shopeepay
                </div>
              </span>
              <span className="flex items-stretch justify-between gap-4 mt-9">
                <div className="flex w-[58px] shrink-0 h-[52px] flex-col rounded-[50%]" />
                <div className="text-black text-lg font-bold my-auto">
                  Bayar ditempat
                </div>
              </span>
            </div>
          </div>
          <div className="self-center flex flex-col items-stretch my-auto">
            <div className="flex shrink-0 h-[27px] flex-col rounded-[50%]" />
            <div className="flex shrink-0 h-[27px] flex-col mt-12 rounded-[50%]" />
            <div className="flex shrink-0 h-[27px] flex-col mt-11 rounded-[50%]" />
            <div className="flex shrink-0 h-[27px] flex-col mt-12 rounded-[50%]" />
            <div className="flex shrink-0 h-[26px] flex-col mt-12 rounded-[50%]" />
            <div className="flex shrink-0 h-[27px] flex-col mt-14 rounded-[50%]" />
          </div>
        </div>
        <div className="bg-stone-100 self-stretch flex flex-col justify-center items-stretch mt-14 px-8 py-5">
          <span className="text-black text-center text-xl font-bold bg-orange-200 items-center pt-6 pb-4 px-16 rounded-3xl">
            Bayar
          </span>
        </div>
      </span>
      <img
        loading="lazy"
        alt=""
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a40a9395c6ad5f3a17f4b5c54650640e29eb573121df1fad1938a92095f31241?"
        className="aspect-[51.67] object-contain object-center w-[155px] stroke-[6px] stroke-white overflow-hidden max-w-full mt-32"
      />
    </div>
  );
}

