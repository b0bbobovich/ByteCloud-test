import React, { useState, useEffect } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, LabelList, ResponsiveContainer, Label } from 'recharts';
import { Wrapper, OptionsContainer, ProviderOptions, OptionLabel, InputsContainer, Input, InputLabel } from "./Chart.styled";
import { Rectangle } from 'recharts';


export const Chart = ({ storage, transfer }) => {
    const [bunnyOption, setBunnyOption] = useState("HDD");
    const [scalewayOption, setScalewayOption] = useState("Single");


    
    useEffect(() => {
        data.filter(provider => provider.name === "scaleway").price = calculatePriceForScaleway(storage, transfer, scalewayOption);
    }, [scalewayOption]);

    useEffect(() => {
        data.filter(provider => provider.name === "bunny").price = calculatePriceForBunny(storage, transfer, bunnyOption);
    }, [bunnyOption]);
    

    const data = [
        { name: 'backblaze', price: calculatePriceForBackblaze(storage, transfer) },
        { name: 'bunny', price: calculatePriceForBunny(storage, transfer, bunnyOption) },
        { name: 'scaleway', price: calculatePriceForScaleway(storage, transfer, scalewayOption) },
        { name: 'vultr', price: calculatePriceForVultr(storage, transfer) }
    ];

    
    function calculatePriceForBackblaze(storage, transfer) {
        const minPrice = 7;
        const storagePrice = 0.005;
        const transferPrice = 0.01;
        const price = (storage * storagePrice) + (transfer * transferPrice);
        return price <= minPrice ? minPrice : roundToTwo(price)
    };

    function calculatePriceForBunny(storage, transfer, option) {
        let storagePrice = 0;
        // eslint-disable-next-line default-case
        switch (option) {
            case "HDD":
                storagePrice = 0.01;
                break;
            case "SDD":
                storagePrice = 0.02;
                break;
        }
        const maxPrice = 10;
        const transferPrice = 0.01;
        const price = (storage * storagePrice) + (transfer * transferPrice);
        return price >= maxPrice ? maxPrice : roundToTwo(price)
    };

    function calculatePriceForScaleway(storage, transfer, option) {
        let storagePrice = 0;
        let transferPrice = 0;

        if (transfer > 75) {
            transfer -= 75
            transferPrice = 0.02;
        }

        // eslint-disable-next-line default-case
        switch (option) {
            case "Multi":
                if (storage > 75) {
                    storage -= 75
                    storagePrice = 0.06;
                }
                break;
            case "Single":
                if (storage > 75) {
                    storage -= 75
                    storagePrice = 0.03;
                }
                break;
        }
        const price = (storage * storagePrice) + (transfer * transferPrice);
        return roundToTwo(price)
    };

    function calculatePriceForVultr(storage, transfer) {
        const minPrice = 5;
        const storagePrice = 0.01;
        const transferPrice = 0.01;
        const price = (storage * storagePrice) + (transfer * transferPrice);
        return price <= minPrice ? minPrice : roundToTwo(price)
    };

    function roundToTwo(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    };

    const handleScalewayOptionChange = (event) => {
        const option = event.target.value;
        setScalewayOption(option);
    };

    const handleBunnyOptionChange = (event) => {
        const option = event.target.value;
        setBunnyOption(option);
    };

    const CustomBar = (props) => {
        let { price, fill } = props;
        const lowestPrice = data.filter(element => element.price === Math.min(...data.map(el => el.price)))[0].price;
        if(price === lowestPrice) {
            fill='#1f77b4';
        }
        else {
            fill = '#989898';
        }
        return <Rectangle {...props} fill={fill} />     
    };

    return (
        <Wrapper>
            <ResponsiveContainer
            >
                <BarChart
                    data={data}
                    layout="horizontal"
                    margin={{
                        top: 30,
                        right: 30,
                        left: 20,
                        bottom: 50,
                    }}
                >
                    <Bar dataKey="price" shape={CustomBar}>
                        <LabelList dataKey={(data) => `${data.price} $`} position="top" />
                    </Bar>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey={"name"} />
                    <YAxis hide />
                </BarChart>
            </ResponsiveContainer>
            <OptionsContainer>
                <ProviderOptions>
                    <OptionLabel>
                        Bunny Options:
                    </OptionLabel>
                    <InputsContainer>
                        <Input type="radio" name="bunny" value="HDD"  onClick={handleBunnyOptionChange} />
                        <InputLabel htmlFor="bunny-option-1">HDD</InputLabel>
                        <Input type="radio" name="bunny" value="SDD" onClick={handleBunnyOptionChange} />
                        <InputLabel htmlFor="bunny-option-2">SDD</InputLabel>
                    </InputsContainer>
                </ProviderOptions>
                <ProviderOptions>
                    <OptionLabel>
                        Scaleway Options:
                    </OptionLabel>
                    <InputsContainer>
                        <Input type="radio" name="scaleway" value="Single" onClick={handleScalewayOptionChange} />
                        <InputLabel htmlFor="scaleway-option-1">Single</InputLabel>
                        <Input type="radio" name="scaleway" value="Multi" onClick={handleScalewayOptionChange} />
                        <InputLabel htmlFor="scaleway-option-2">Multi</InputLabel>
                    </InputsContainer>
                </ProviderOptions>
            </OptionsContainer>
        </Wrapper>

    )
};

